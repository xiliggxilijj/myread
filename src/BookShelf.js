import React from 'react';
import BookList from './BookList'
import PropTypes from 'prop-types';



const BookShelf=(props)=> {
    return (
    <div className="bookshelf">       
        <h2 className="bookshelf-title">{props.shelf.title}</h2>
		<div className="bookshelf-books">
            <BookList books={ props.shelf.books }  onShelfSelect={props.onShelfSelect} />			
		</div>
	</div>
    );  
}

BookShelf.propTypes = {
    shelf: PropTypes.object.isRequired,
    onShelfSelect: PropTypes.func.isRequired,
}
export default BookShelf;
