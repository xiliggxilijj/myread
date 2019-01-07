import React from 'react'
import BookShelfChange from './BookShelfChange'
import PropTypes from 'prop-types';

const Book = props => {
  const bookurl=props.book.imageLinks&&props.book.imageLinks.thumbnail?props.book.imageLinks.thumbnail:'unknown';
  return (
   	<div className="book">
    	<div className="book-top">
      		<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookurl})` }}></div>
    		<BookShelfChange book={props.book} onShelfSelect={props.onShelfSelect}/>
    	</div>
   	 	<div className="book-title">{props.book.title}</div>
    	<div className="book-authors">{props.book.author}</div>
  </div>
  );
};
Book.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfSelect: PropTypes.func.isRequired,
}
export default Book;