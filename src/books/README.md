# How to Add Books

Add your books as markdown files in this folder.

## Format

Create a file like `book-title.md` with this structure:

```markdown
---
title: 'Book Title'
author: 'Author Name'
status: 'read'
rating: 5
date: '2024-12-15'
cover: 'https://covers.openlibrary.org/b/isbn/YOUR-ISBN-L.jpg'
tags:
  - genre1
  - genre2
  - theme1
---

# Book Title

by **Author Name**

Write your review and thoughts here. You can use:

- Markdown formatting
- **Bold text**
- *Italic text*
- Lists
- Headings

## Rating

⭐⭐⭐⭐⭐
```

## Status Options

- `reading` - Currently reading
- `read` - Finished reading
- `want-to-read` - Want to read

## Rating

1-5 stars

## Date

Use format: `YYYY-MM-DD`

## Cover Image

Optional: Add a cover image URL. Use Open Library for free book covers:
- Format: `https://covers.openlibrary.org/b/isbn/YOUR-ISBN-L.jpg`
- Replace `YOUR-ISBN` with the book's ISBN
- The `-L.jpg` suffix provides a large image

## Tags

Optional: Add tags to categorize your books:
- Use YAML array format
- Example: `tags: - fiction - romance - mystery`
- Tags appear as hashtags on book cards

