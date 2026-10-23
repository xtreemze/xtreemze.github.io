#!/usr/bin/env node
// Authenticated, read-only owned repository inventory. Do not publish private reports.
import { writeFile } from "node:fs/promises";
import { collectPortfolio } from "./portfolio-audit-core.mjs";

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!token) {
  console.error("GH_TOKEN or GITHUB_TOKEN with read access is required.");
  process.exitCode = 2;
} else {
  try {
    const owner = process.env.GITHUB_OWNER || "xtreemze";
    const records = await collectPortfolio({ owner, token });
    const output = process.env.PORTFOLIO_AUDIT_OUTPUT || "portfolio-private-audit.json";
    await writeFile(output, JSON.stringify({
      schema_version: "0.3",
      generated_at: new Date().toISOString(),
      owner,
      scope: "accessible owned repositories",
      disclaimer: "Structural evidence only. No build, security or workflow execution is certified.",
      count: records.length,
      repositories: records,
    }, null, 2) + "\n", { mode: 0o600 });
    console.log(`Wrote local inventory of ${records.length} repositories; do not publish private contents.`);
  } catch (error) {
    console.error(String(error));
    process.exitCode = 1;
  }
}
