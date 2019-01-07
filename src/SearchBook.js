import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import * as BooksAPI from './BooksAPI'
import DebounceInput from 'react-debounce-input'
import BookList from './BookList'

class SearchBook extends Component {
  state = {
      books:[]
  }
  onShelfSelect =(event,book)=>{
     if(event.target.value&&event.target.value!==book.shelf){
       this.props.onShelfSelect(event,book);
       const updatedBooks = [...this.state.books];
       for (var j=0; j < updatedBooks.length; j++) {
          if (updatedBooks[j].id === book.id) {
              updatedBooks[j].shelf=event.target.value;
            break;
          }
        }
        this.setState({ books:updatedBooks });
     }
  }
  
  doSearch=(query)=>{
    BooksAPI.search(query,20).then((books) => {
        //console.log("search result len:"+books.length);
        if(!books.length){
          if(this.state.books.length>0){
            this.setState({books:[]});
          }
        }else{
            for (var i=0; i < books.length; i++) {
              let foundBook=this.props.checkBookShelf(books[i]);
              if(foundBook){
                books[i].shelf=foundBook.shelf;
              }             
            }
        	this.setState({books});
        }
    });    
  }
  onInputChange=(e)=>{
     //console.log("onInputChange ==values:"+e.target.value);
     const query=e.target.value;
     if(query&&query.trim().length>0){
        this.doSearch(query.trim());
     }else if(this.state.books.length>0){
       this.setState({books:[]});
     }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    //console.log("handleSubmit ==values:"+JSON.stringify(values)+" value:"+values.search);
   
    if(values.search&&values.search.trim().length>0){
      this.doSearch(values.search.trim());
      if(this.state.books.length===0){
           confirm("No book found!");
      }
    }else {
      confirm("Invalid Input!");
    }
  }

  render() {
    return (
     	<div className="search-books">
            <div className="search-books-bar">              
              <Link className='close-search' to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                   
                  
                */}
                 <form onSubmit={this.handleSubmit} >
                    <DebounceInput
                      debounceTimeout={600}
                      name='search' type="text"
                      placeholder="Search by title or author"
                      onChange={(e) => this.onInputChange(e)}
                    />                	
				 </form>
                

              </div>
            </div>
    
            <div className="search-books-results">{                            
			  	<BookList books={  this.state.books }  onShelfSelect={this.onShelfSelect} />		
			}
            </div>
    	</div>
		
    )
  }
}

export default SearchBook
