import { useState } from 'react'
import './BookForm.css'

function BookForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'reading',
    rating: '',
    review: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('Please enter a book title')
      return
    }
    onSubmit(formData)
    setFormData({
      title: '',
      author: '',
      status: 'reading',
      rating: '',
      review: ''
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="book-form-container">
      <form className="book-form" onSubmit={handleSubmit}>
        <h2>Add New Book</h2>

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="reading">Currently Reading</option>
            <option value="read">Read</option>
            <option value="want-to-read">Want to Read</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (1-5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            placeholder="1-5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="Write your review or thoughts about the book..."
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Add Book
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookForm

