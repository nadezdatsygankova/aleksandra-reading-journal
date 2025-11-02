import { useNavigate } from 'react-router-dom';
import './BookCard.css';

function BookCard({ book }) {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    if (!rating) return null;
    const stars = [];
    const numRating = parseInt(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < numRating ? 'star filled' : 'star'}>
          ⭐
        </span>,
      );
    }
    return <div className="rating-stars">{stars}</div>;
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'reading':
        return 'Currently Reading';
      case 'read':
        return 'Read';
      case 'want-to-read':
        return 'Want to Read';
      default:
        return '';
    }
  };

  const getPreview = (content) => {
    // Extract first paragraph as preview
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const firstP = doc.querySelector('p');
    if (firstP && firstP.textContent) {
      return firstP.textContent.substring(0, 200) + '...';
    }
    return content.substring(0, 200) + '...';
  };

  const getCoverUrl = (title, author) => {
    if (book.cover) return book.cover;
    // Generate placeholder or use API
    return `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-S.jpg`;
  };

  return (
    <>
      <article className="book-card" onClick={() => navigate(`/book/${book.id}`)}>
        <div className="book-cover">
          <img src={getCoverUrl(book.title, book.author)} alt={book.title} />
        </div>
        <div className="book-header">
          <div className="book-info">
            <div className="book-status">{getStatusText(book.status)}</div>
            <h3 className="book-title">{book.title}</h3>
            {book.author && <p className="book-author">by {book.author}</p>}
            {book.rating && <div className="rating-display-inline">{renderStars(book.rating)}</div>}
          </div>
          {book.date && (
            <time className="book-date">
              {new Date(book.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
          )}
        </div>

        {book.tags && book.tags.length > 0 && (
          <div className="book-tags">
            {book.tags.map((tag, idx) => (
              <span key={idx} className="book-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {book.review && (
          <div className="book-review-preview">
            <p>{getPreview(book.review)}</p>
          </div>
        )}
      </article>
    </>
  );
}

export default BookCard;
