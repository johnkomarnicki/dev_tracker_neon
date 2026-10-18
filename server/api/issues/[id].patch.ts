import type { Issue } from "~~/types/devtrack";

export default defineEventHandler(async (event): Promise<Issue> => {
  const id = getRouterParam(event, "id");
  const body = await readBody<{ status: Issue["status"] }>(event);

  const [issue] = await sql`
    UPDATE issues SET status = ${body.status}
    WHERE id = ${id}
    RETURNING *
  `;

  return issue as Issue;
});
