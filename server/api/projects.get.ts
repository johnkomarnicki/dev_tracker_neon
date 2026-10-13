import type { Project } from "~~/types/devtrack";

export default defineEventHandler(async (): Promise<Project[]> => {
  const projects = await sql`SELECT * FROM projects`;
  return projects as Project[];
});
