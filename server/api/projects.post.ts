import type { CreateProjectInput, Project } from "~~/types/devtrack";

export default defineEventHandler(async (event): Promise<Project> => {
  const body = await readBody<Partial<CreateProjectInput>>(event);

  if (!body.name || !body.description) {
    throw createError({
      statusCode: 400,
      statusMessage: "Project name and description is required",
    });
  }

  const [project] = await sql`
    INSERT INTO projects (name, description)
    VALUES (${body.name}, ${(body.description as string) || null})
    RETURNING *
  `;

  setResponseStatus(event, 201);
  return project as Project;
});
