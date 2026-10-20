import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { Issue } from "~~/types/devtrack";

export const s3 = new S3Client({ forcePathStyle: true });

export function getObjectUrl(bucket: string, key: string): string {
  return `${process.env.AWS_ENDPOINT_URL_S3}/${bucket}/${key}`;
}

export async function uploadObject(bucket: string, key: string, body: Buffer, contentType?: string): Promise<string> {
  await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }));
  return getObjectUrl(bucket, key);
}

export function withAttachmentUrl(issue: Issue, bucket: string): Issue {
  return {
    ...issue,
    attachment_url: issue.attachment_key ? getObjectUrl(bucket, issue.attachment_key) : null,
  };
}
