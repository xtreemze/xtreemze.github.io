import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    sourcePath: z.string().regex(/^projects\/[a-z0-9-]+\.html$/),
    summary: z.string().min(1),
    tier: z.enum(["primary", "lab", "supporting"]),
    visibility: z.enum(["public", "private"]),
    stack: z.array(z.string().min(1)).min(1),
    sortOrder: z.number().int().nonnegative(),
  }),
});

export const collections = { projects };
