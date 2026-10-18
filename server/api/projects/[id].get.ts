import type { Project } from "~~/types/devtrack";

export default defineEventHandler(async (event): Promise<Project> => {
  const id = getRouterParam(event, "id");
  const [project] = await sql`SELECT * FROM projects WHERE id = ${id}`;

  if (!project) {
    throw createError({ statusCode: 404, statusMessage: "Project not found" });
  }

  return project as Project;
});
