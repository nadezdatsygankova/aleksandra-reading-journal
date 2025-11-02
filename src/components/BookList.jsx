import BookCard from './BookCard'
import './BookList.css'

function BookList({ books, searchQuery, allBooks }) {
  const getBooksByStatus = (status) => {
    return books.filter(book => book.status === status)
  }

  const readingBooks = getBooksByStatus('reading')
  const readBooks = getBooksByStatus('read')
  const wantToReadBooks = getBooksByStatus('want-to-read')

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>{searchQuery ? 'No books found matching your search.' : 'No books yet. Add markdown files to the books folder!'}</p>
      </div>
    )
  }

  return (
    <div className="book-list">
      {readingBooks.length > 0 && (
        <section className="book-section">
          <h2 className="section-title">
            Currently Reading
          </h2>
          <div className="books-grid">
            {readingBooks.map(book => (
              <BookCard key={book.id} book={book} allBooks={allBooks} />
            ))}
          </div>
        </section>
      )}

      {readBooks.length > 0 && (
        <section className="book-section">
          <h2 className="section-title">
            Read
          </h2>
          <div className="books-grid">
            {readBooks.map(book => (
              <BookCard key={book.id} book={book} allBooks={allBooks} />
            ))}
          </div>
        </section>
      )}

      {wantToReadBooks.length > 0 && (
        <section className="book-section">
          <h2 className="section-title">
            Want to Read
          </h2>
          <div className="books-grid">
            {wantToReadBooks.map(book => (
              <BookCard key={book.id} book={book} allBooks={allBooks} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default BookList
