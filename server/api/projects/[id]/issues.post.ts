import type { CreateIssueInput, Issue } from "~~/types/devtrack";

export default defineEventHandler(async (event): Promise<Issue> => {
  const projectId = getRouterParam(event, "id");
  const body = await readBody<CreateIssueInput>(event);

  const [issue] = await sql`
    INSERT INTO issues (project_id, title, description, status, attachment_key, attachment_name, attachment_type)
    VALUES (
      ${projectId},
      ${body.title},
      ${body.description || null},
      ${body.status},
      ${body.attachment_key || null},
      ${body.attachment_name || null},
      ${body.attachment_type || null}
    )
    RETURNING *
  `;

  return withAttachmentUrl(issue as Issue, "screenshots");
});
