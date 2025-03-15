# Google Drive Blog Integration

This document provides instructions for setting up and using the Google Drive integration for your blog.

## Overview

This integration allows you to:

- Store your blog posts as Markdown (.md) files in Google Drive
- Automatically sync these files to your Supabase database
- Render the posts on your website

## Setup Instructions

### 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Drive API for your project
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API" and enable it

### 2. Create a Service Account

1. In your Google Cloud project, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Give your service account a name and description
4. Grant the service account the "Viewer" role
5. Click "Done"
6. Click on your newly created service account
7. Go to the "Keys" tab
8. Click "Add Key" > "Create new key"
9. Choose JSON format and click "Create"
10. Save the downloaded JSON file as `google-credentials.json` in the root of your project

### 3. Set Up Your Google Drive Folder

1. Create a folder in Google Drive to store your blog posts
2. Share this folder with the service account email (found in your credentials JSON)
3. Get the folder ID from the URL: `https://drive.google.com/drive/folders/YOUR_FOLDER_ID`

### 4. Configure Environment Variables

Create a `.env` file based on the `.env.example` and fill in:

```
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
GOOGLE_CREDENTIALS_PATH=./google-credentials.json
BLOG_SYNC_API_KEY=your_generated_api_key
DEV_SECRET=your_dev_secret
```

### 5. Create Your First Blog Post

1. Create a Markdown file in your Google Drive folder
2. Use frontmatter to provide metadata:

```markdown
---
title: Your Blog Post Title
subtitle: A brief description
date: 2023-06-15
tags: [tag1, tag2]
---

Your blog post content goes here...
```

## Usage

### Manual Sync

To manually sync your blog posts, run:

```bash
node scripts/sync-blog.js
```

### Automatic Sync via API

You can trigger a sync via the API endpoint:

```bash
curl -X POST https://your-website.com/api/sync-blog \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Setting Up Automatic Syncing

For automatic syncing, you can set up a GitHub Action or other CI/CD pipeline to call the sync API whenever you update files in your Google Drive folder. Alternatively, you could use Google Apps Script to trigger the sync whenever files in the folder are modified.

## Markdown Format

Your Markdown files should use the following format:

```markdown
---
title: Your Blog Post Title
subtitle: Optional subtitle
date: YYYY-MM-DD
tags: [tag1, tag2]
slug: optional-custom-slug
---

Your blog post content in Markdown format...
```

If you don't provide a slug, one will be generated from the filename.

## Troubleshooting

- **API Error 401**: Check that your API key is correct
- **Google Drive API Error**: Verify that your service account has access to the folder
- **Sync Fails Silently**: Check server logs for detailed error messages
