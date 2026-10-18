import type { Issue } from "~~/types/devtrack";

export default defineEventHandler(async (): Promise<Issue[]> => {
  const issues = await sql`SELECT * FROM issues ORDER BY created_at DESC`;
  return issues as Issue[];
});
