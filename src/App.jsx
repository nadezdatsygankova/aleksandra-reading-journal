import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import BookList from './components/BookList';
import { getAllBooks } from './utils/loadBooks';
import logo from './logo.jpg';
import './App.css';
import './dark-mode.css';

function App() {
  const allBooks = getAllBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [filterTag, setFilterTag] = useState('all');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setFilterTag(tagParam);
    }
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Get all unique tags
  const allTags = [...new Set(allBooks.flatMap((book) => book.tags || []))].sort();

  const filteredBooks = allBooks
    .filter((book) => {
      // Search filter
      const query = searchQuery.toLowerCase();
      const title = book.title?.toLowerCase() || '';
      const author = book.author?.toLowerCase() || '';
      const tags = book.tags?.join(' ').toLowerCase() || '';
      const matchesSearch = title.includes(query) || author.includes(query) || tags.includes(query);

      // Status filter
      const matchesStatus = filterStatus === 'all' || book.status === filterStatus;

      // Rating filter
      const matchesRating =
        filterRating === 'all' ||
        (filterRating === '5' && book.rating >= 5) ||
        (filterRating === '4+' && book.rating >= 4) ||
        (filterRating === '3+' && book.rating >= 3);

      // Tag filter
      const matchesTag = filterTag === 'all' || (book.tags && book.tags.includes(filterTag));

      return matchesSearch && matchesStatus && matchesRating && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'author') {
        return a.author.localeCompare(b.author);
      } else if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      } else {
        return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
      }
    });

  const stats = {
    total: allBooks.length,
    read: allBooks.filter((b) => b.status === 'read').length,
    reading: allBooks.filter((b) => b.status === 'reading').length,
    wantToRead: allBooks.filter((b) => b.status === 'want-to-read').length,
    avgRating: (
      allBooks.filter((b) => b.rating).reduce((sum, b) => sum + (b.rating || 0), 0) /
      allBooks.filter((b) => b.rating).length
    ).toFixed(1),
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content-wrapper">
          <div className="header-main" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/">
              <img src={logo} alt="Logo" style={{ height: '50px', width: 'auto' }} />
            </Link>
            <h1 className="header-title">Where Pages Burn and Dragons Whisper</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Light mode' : 'Dark mode'}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <input
              type="text"
              className="search-input-header"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="intro-section">
        <p className="intro-text">
          Stories I read, legends I hear, with rain tapping the window and tea in hand.
        </p>
        <p className="intro-byline">— Aleksandra</p>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="reading">Reading</option>
            <option value="want-to-read">Want to Read</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            className="filter-select"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}>
            <option value="all">All</option>
            <option value="5">5 stars</option>
            <option value="4+">4+ stars</option>
            <option value="3+">3+ stars</option>
          </select>
        </div>

        {allTags.length > 0 && (
          <div className="filter-group">
            <label htmlFor="tag">Tag:</label>
            <select
              id="tag"
              className="filter-select"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}>
              <option value="all">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  #{tag}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <BookList books={filteredBooks} searchQuery={searchQuery} onTagClick={setFilterTag} />

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src={logo} alt="Logo" style={{ height: '50px', width: 'auto' }} />
              <h3>Aleksandra's Reading Journal</h3>
            </div>
            <div className="footer-links">
              <a
                href="https://blog-tsy-nadia.netlify.app/en"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link">
                <i className="fas fa-earth-americas"></i> Travel Blog
              </a>
              <a
                href="https://www.instagram.com/aleksatoronto"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              Made by{' '}
              <a href="https://www.nadiatsy.com/" target="_blank" rel="noopener noreferrer">
                NadiaTsy
              </a>
            </p>
            <p>© 2025 Aleksandra's Reading Journal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
