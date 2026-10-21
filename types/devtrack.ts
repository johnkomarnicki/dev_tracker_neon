export type Project = {
  id: string;
  name: string;
  description: string | null;
  created_at: string | null;
};

export type IssueStatus = "open" | "in_progress" | "closed";

export type IssueAttachment = {
  key?: string;
  name: string;
  type: string;
  size?: number;
  url?: string;
  attachment_url?: string | null;
};

export type Issue = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: IssueStatus;
  attachment_url?: string | null;
  attachment_key: string | null;
  attachment_name: string | null;
  attachment_type: string | null;
  created_at: string | null;
};

export type ProjectStats = {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
};

export type CreateProjectInput = {
  name: string;
  description: string;
};

export type CreateIssueInput = {
  title: string;
  description: string;
  status: IssueStatus;
  attachment_key?: string;
  attachment_name?: string;
  attachment_type?: string;
};
