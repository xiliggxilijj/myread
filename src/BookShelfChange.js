import React from 'react';
import PropTypes from 'prop-types';


const BookShelfChange=(props)=> {
    //console.log("BookShelfChange shelf:"+props.book.shelf);
  	const selectedShelf=props.book.shelf?props.book.shelf:'none';
    
  	const optionItems=[
                     {key: 1, label:'Currently Reading',value:'currentlyReading'},
                     {key: 2,label:'Want to Read',value:'wantToRead'},
                     {key: 3,label:'Read',value:'read'},
                     {key: 4,label:'None',value:'none'}];
    return (
      <div className="book-shelf-changer">
        <select defaultValue={selectedShelf}  onChange={(event) => props.onShelfSelect(event, props.book)}  id={props.book.id} >
            <option value="move" disabled > &nbsp; &nbsp;Move to...</option>
            {	optionItems.map(option => (                           
              <option key={option.key} value={option.value}>{option.value===selectedShelf?(`✓\u00A0`):(`\u00A0\u00A0\u00A0`)}{option.label}</option>
            ))}		
        </select>
      </div>
    );
};

BookShelfChange.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfSelect: PropTypes.func.isRequired,
}
export default BookShelfChange;
