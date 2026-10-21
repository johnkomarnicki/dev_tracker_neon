import type { IssueAttachment } from "~~/types/devtrack";

export default defineEventHandler(async (event): Promise<IssueAttachment> => {
  const [file] = (await readMultipartFormData(event)) ?? [];

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: "A screenshot file is required" });
  }

  const key = `${crypto.randomUUID()}`;
  const url = await uploadObject("screenshots", key, file.data, file.type);

  return {
    key,
    name: file.filename ?? "screenshot",
    type: file.type ?? "",
    size: file.data.length,
    url,
  };
});
