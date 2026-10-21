import type { Issue } from "~~/types/devtrack";
import { withAttachmentUrl } from "~~/server/utils/storage";

export default defineEventHandler(async (): Promise<Issue[]> => {
  const issues = await sql`SELECT * FROM issues ORDER BY created_at DESC`;
  return (issues as Issue[]).map((issue) => withAttachmentUrl(issue, "screenshots"));
});
