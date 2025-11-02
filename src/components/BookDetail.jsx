import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllBooks } from '../utils/loadBooks';
import './BookDetail.css';

function BookDetail() {
  const { id } = useParams();
  const allBooks = getAllBooks();
  const book = allBooks.find(b => b.id === id);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  if (!book) {
    return (
      <div className="not-found">
        <h1>Book not found</h1>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  const trackView = () => {
    const views = localStorage.getItem('bookViews') ? JSON.parse(localStorage.getItem('bookViews')) : {};
    views[book.id] = (views[book.id] || 0) + 1;
    localStorage.setItem('bookViews', JSON.stringify(views));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    trackView();
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.share({
        title: `${book.title} by ${book.author}`,
        text: `Check out this book: ${book.title}`,
        url: url,
      });
    } catch (err) {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const getRecommendations = () => {
    if (!book.tags || book.tags.length === 0) return [];

    const recommendations = allBooks
      .filter(b => b.id !== book.id && b.tags && b.tags.some(tag => book.tags.includes(tag)))
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
        </span>
      );
    }
    return <div className="rating-stars">{stars}</div>;
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'reading': return 'Currently Reading';
      case 'read': return 'Read';
      case 'want-to-read': return 'Want to Read';
      default: return '';
    }
  };

  const getCoverUrl = () => {
    if (book.cover) return book.cover;
    return `https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-S.jpg`;
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content-wrapper">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Light mode' : 'Dark mode'}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="share-button" onClick={handleShare} title="Share book">
              🔗
            </button>
          </div>
        </div>
      </header>

      <div className="book-detail-page">
        <div className="book-detail-container">
          <div className="book-cover-large">
            <img src={getCoverUrl()} alt={book.title} />
          </div>

          <div className="book-detail-content">
            <div className="book-status-detail">{getStatusText(book.status)}</div>
            <h1 className="book-title-detail">{book.title}</h1>
            {book.author && <p className="book-author-detail">by {book.author}</p>}
            {book.rating && (
              <div className="rating-display-detail">
                {renderStars(book.rating)}
              </div>
            )}
            {book.date && (
              <time className="book-date-detail">
                {new Date(book.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}

            {book.url && (
              <div className="book-url-section">
                <a href={book.url} target="_blank" rel="noopener noreferrer" className="goodreads-link">
                  <i className="fas fa-shopping-cart"></i> View on Amazon
                </a>
              </div>
            )}

            {book.tags && book.tags.length > 0 && (
              <div className="book-tags-detail">
                {book.tags.map((tag, idx) => (
                  <Link key={idx} to={`/?tag=${encodeURIComponent(tag)}`} className="book-tag-detail">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {book.review && (
              <div className="book-review-detail">
                <div dangerouslySetInnerHTML={{ __html: book.review }} />
              </div>
            )}

            {getRecommendations().length > 0 && (
              <div className="book-recommendations-detail">
                <h3 className="recommendations-title-detail">You might also like:</h3>
                <div className="recommendations-list-detail">
                  {getRecommendations().map(rec => (
                    <Link
                      key={rec.id}
                      to={`/book/${rec.id}`}
                      className="recommendation-item-detail">
                      <div className="recommendation-info-detail">
                        <strong>{rec.title}</strong>
                        {rec.author && <span>by {rec.author}</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;

