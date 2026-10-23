// Pure, dependency-injected GitHub reconnaissance logic.
export async function collectPortfolio({ owner, token, request = fetch }) {
  if (!/^[a-z0-9-]+$/i.test(owner)) throw new Error("Invalid owner");
  if (!token) throw new Error("Token required");
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-quality-audit",
  };
  async function get(path) {
    const response = await request(`https://api.github.com${path}`, { headers });
    if (response.status === 404) return { state: "missing" };
    if (!response.ok) {
      const error = new Error(`GitHub returned HTTP ${response.status} for ${path}`);
      error.status = response.status;
      throw error;
    }
    return { state: "ok", data: await response.json() };
  }
  const repositories = [];
  for (let page = 1; ; page++) {
    const result = await get(`/user/repos?affiliation=owner&per_page=100&page=${page}`);
    if (!Array.isArray(result.data)) throw new Error("Unexpected GitHub repository response");
    repositories.push(...result.data.filter((r) => r.owner?.login?.toLowerCase() === owner.toLowerCase()));
    if (result.data.length < 100) break;
  }

  const records = [];
  for (const repo of repositories) {
    const record = {
      repository: repo.full_name,
      visibility: repo.private ? "private" : "public",
      default_branch: repo.default_branch,
      archived: repo.archived,
      root_status: "unknown",
      observed_files: [],
      ci_status: "unknown",
      workflow_files: [],
      build_status: "unknown",
      security_status: "unknown",
    };
    try {
      const prefix = `/repos/${encodeURIComponent(repo.owner.login)}/${encodeURIComponent(repo.name)}/contents`;
      const root = await get(prefix);
      if (Array.isArray(root.data)) {
        const paths = root.data.map((entry) => entry.name);
        record.root_status = "observed";
        record.observed_files = paths.filter((name) => ["README.md", "LICENSE", "SECURITY.md", "CONTRIBUTING.md", "package.json", "pnpm-lock.yaml", "package-lock.json", "Cargo.toml", "pyproject.toml", ".github"].includes(name));
        if (paths.includes(".github")) {
          const workflows = await get(`${prefix}/.github/workflows`);
          if (Array.isArray(workflows.data)) {
            record.workflow_files = workflows.data.filter((entry) => /\.ya?ml$/i.test(entry.name)).map((entry) => entry.name);
            record.ci_status = record.workflow_files.length ? "configured-unverified" : "no-workflow-files-observed";
          } else if (workflows.state === "missing") {
            record.ci_status = "no-workflow-directory-observed";
          }
        } else {
          record.ci_status = "no-github-directory-observed";
        }
      }
    } catch (error) {
      record.error = String(error);
      if (error.status === 403 || error.status === 429) throw error;
    }
    records.push(record);
  }
  return records;
}
