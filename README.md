# 📚 Aleksandra's Reading Journal

**Where Pages Burn and Dragons Whisper** — Stories I read, legends I hear, with rain tapping the window and tea in hand.

A beautiful, modern reading journal built with React that lets you track your books with markdown files - just like a blog!

## Features

- 📖 **Markdown-Based**: Write your book reviews in markdown files
- 🖼️ **Cover Images**: Beautiful covers from various sources
- 🔍 **Search & Filter**: Search by title, author, or tags. Filter by status and rating
- 🏷️ **Tags**: Organize books with hashtags
- 🌙 **Dark Mode**: Toggle dark/light theme
- 📊 **Statistics**: Track total books and average ratings
- 🔗 **Share**: Share individual books with shareable links
- 💡 **Recommendations**: Get book recommendations based on shared tags
- 📱 **Responsive**: Beautiful on desktop, tablet, and mobile
- ⚡ **Fast**: Built with Vite for instant hot reload

## How It Works

Your reading journal uses markdown files to store your book reviews. Simply create a `.md` file for each book in the `src/books/` folder.

### Book File Format

```markdown
---
title: 'Book Title'
author: 'Author Name'
status: 'read'
rating: 5
date: '2024-12-15'
cover: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg'
tags:
  - fiction
  - mystery
  - thriller
---

# Book Title

by **Author Name**

Your review here. Use markdown for formatting:

- Bullet points
- **Bold text**
- *Italic text*
- Headings

## My Thoughts

Write your detailed thoughts about the book here.

## Rating

⭐⭐⭐⭐⭐
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open `http://localhost:3000` in your browser

## Adding Books

1. Create a new `.md` file in `src/books/` folder
2. Add front matter (title, author, status, rating, date, cover, tags)
3. Write your review in markdown
4. Save the file - it will appear automatically!

## Status Options

- `reading` - Currently reading
- `read` - Finished reading
- `want-to-read` - Want to read

## Getting Cover Images

Use Open Library for free book covers:
```
https://covers.openlibrary.org/b/isbn/YOUR-ISBN-L.jpg
```

Replace `YOUR-ISBN` with the book's ISBN number.

## Features Overview

### Search & Filter
- Search by title, author, or tags
- Filter by reading status
- Filter by rating (5 stars, 4+, 3+)
- Sort by date, title, author, or rating

### Dark Mode
Click the moon/sun icon in the header to toggle dark mode. Your preference is saved.

### Share Books
Click the 🔗 button in any book modal to share it. Works with native sharing or copies link to clipboard.

### Recommendations
When viewing a book, see other books with similar tags - automatically generated!

### Analytics
Book views are tracked automatically as you read through your journal.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory. Deploy to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Lightning-fast build tool
- **Marked**: Markdown parsing
- **Gray-Matter**: Front matter parsing
- **CSS3**: Modern, clean design with a beautiful pink theme

## Project Structure

```
aleksandra-reading-journal/
├── src/
│   ├── books/              # Your markdown book files go here!
│   ├── components/
│   │   ├── BookCard.jsx    # Book card with modal
│   │   ├── BookCard.css
│   │   ├── BookList.jsx    # Organized book sections
│   │   └── BookList.css
│   ├── utils/
│   │   └── loadBooks.js    # Loads and parses markdown files
│   ├── App.jsx             # Main app with filters
│   ├── App.css
│   ├── dark-mode.css       # Dark mode styles
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Tips

- Use consistent tags to get better recommendations
- Add detailed reviews - markdown supports everything!
- Use front matter for metadata
- Cover images make your journal beautiful
- Group similar books with tags

## License

This project is open source and available for personal use.

---

Made with ❤️ for readers everywhere
