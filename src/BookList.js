import React from 'react';
import Book from './Book'
import PropTypes from 'prop-types';

const BookList=(props)=> {
    return (
      	<ol className="books-grid">{
      		props.books.map(book => (                           
              	<li key={book.id}>
                  <Book
					book={book}                  
                    onShelfSelect={props.onShelfSelect}
                  />
                </li>
          	))
		}
		</ol>
    );
}
BookList.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfSelect: PropTypes.func.isRequired,
}
export default BookList;