import { useState, useEffect } from 'react';
import './BookCard.css';

function BookCard({ book, allBooks = [] }) {
  const [showModal, setShowModal] = useState(false);

  const trackView = () => {
    const views = localStorage.getItem('bookViews')
      ? JSON.parse(localStorage.getItem('bookViews'))
      : {};
    views[book.id] = (views[book.id] || 0) + 1;
    localStorage.setItem('bookViews', JSON.stringify(views));
  };

  useEffect(() => {
    if (showModal) {
      trackView();
    }
  }, [showModal]);

  const handleShare = async () => {
    const url = `${window.location.href.split('#')[0]}#book-${book.id}`;
    try {
      await navigator.share({
        title: `${book.title} by ${book.author}`,
        text: `Check out this book: ${book.title} - ${url}`,
        url: url,
      });
    } catch (err) {
      // Fallback to copy to clipboard
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const getRecommendations = () => {
    if (!book.tags || book.tags.length === 0) return [];

    const recommendations = allBooks
      .filter((b) => b.id !== book.id && b.tags && b.tags.some((tag) => book.tags.includes(tag)))
      .slice(0, 3);

    return recommendations;
  };

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
      <article className="book-card" onClick={() => setShowModal(true)}>
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

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-actions">
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </button>
              <button className="modal-share" onClick={handleShare} title="Share book">
                🔗
              </button>
            </div>
            <div className="book-header-full">
              <div className="book-info-full">
                <div className="book-status-full">{getStatusText(book.status)}</div>
                <h2 className="book-title-full">{book.title}</h2>
                {book.author && <p className="book-author-full">by {book.author}</p>}
                {book.rating && (
                  <div className="rating-display-full">{renderStars(book.rating)}</div>
                )}
              </div>
              {book.date && (
                <time className="book-date-full">
                  {new Date(book.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}
            </div>

            {book.review && (
              <div className="book-review-full">
                <div dangerouslySetInnerHTML={{ __html: book.review }} />
              </div>
            )}

            {getRecommendations().length > 0 && (
              <div className="book-recommendations">
                <h3 className="recommendations-title">You might also like:</h3>
                <div className="recommendations-list">
                  {getRecommendations().map((rec) => (
                    <div
                      key={rec.id}
                      className="recommendation-item"
                      onClick={() => setShowModal(false)}>
                      <div className="recommendation-info">
                        <strong>{rec.title}</strong>
                        {rec.author && <span>by {rec.author}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BookCard;
