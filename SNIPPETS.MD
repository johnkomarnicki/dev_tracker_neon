<!-- CREATE TABLES -->

CREATE TABLE projects (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT NOT NULL,
description TEXT,
created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE issues (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
title TEXT NOT NULL,
description TEXT,
status TEXT NOT NULL DEFAULT 'open',
attachment_key TEXT,
attachment_name TEXT,
attachment_type TEXT,
created_at TIMESTAMPTZ DEFAULT NOW()
);

<!-- SEED PROJECTS TABLE -->

INSERT INTO projects (name, description)
VALUES
('Website Redesign', 'Refresh the marketing site with the new brand, pricing, and navigation.'),
('Mobile App', 'iOS and Android apps for managing projects on the go.'),
('Developer Portal', 'Public API reference, guides, and SDK documentation.')
RETURNING \*;
