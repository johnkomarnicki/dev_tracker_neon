import type { Issue } from "~~/types/devtrack";

export default defineEventHandler(async (event): Promise<Issue[]> => {
  const projectId = getRouterParam(event, "id");

  const issues = await sql`
    SELECT * FROM issues
    WHERE project_id = ${projectId}
    ORDER BY created_at DESC
  `;

  return issues as Issue[];
});
