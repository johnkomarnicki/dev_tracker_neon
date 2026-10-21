import type { CreateProjectInput, Project } from "~~/types/devtrack";

export default defineEventHandler(async (event): Promise<Project> => {
  const body = await readBody<CreateProjectInput>(event);

  const [project] = await sql`
    INSERT INTO projects (name, description)
    VALUES (${body.name}, ${body.description || null})
    RETURNING *
  `;

  return project as Project;
});
