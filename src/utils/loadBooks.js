import { marked } from 'marked'

// Import all markdown files from the books directory
const books = import.meta.glob('../books/*.md', { eager: true })

export function getAllBooks() {
  const entries = Object.entries(books)
  console.log('Found books:', entries.length, entries.map(([path]) => path))

  return entries
    .filter(([path]) => !path.includes('README.md'))
    .map(([path, module]) => {
      const fileName = path.split('/').pop().replace('.md', '')
      const { data, content } = module.default
      console.log('Loading book:', fileName, data)

      // Parse markdown to HTML
      const htmlReview = marked(content.trim())

      return {
        id: fileName,
        slug: fileName,
        title: data.title || 'Untitled',
        author: data.author || '',
        status: data.status || 'read',
        rating: data.rating || null,
        date: data.date,
        cover: data.cover || null,
        tags: data.tags || [],
        review: htmlReview,
        createdAt: data.date,
        notes: []
      }
    })
    .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
}
