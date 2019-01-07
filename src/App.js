import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
//import BookShelfChange from './BookShelfChange'
//import Book from './Book'
import BookShelf from './BookShelf'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false,
    shelves:[{title:'Currently Reading',name:'currentlyReading',books:[]},
             {title:'Want to Read',name:'wantToRead',books:[]},
             {title:'Read',name:'read',books:[]}],
  }
  constructor(props){
    super(props);
    this.refreshShelves();
  }
  refreshShelves(){ 
    let shelves=[];
    BooksAPI.getAll().then((allBooks) => {
      let readingShelf={title:'Currently Reading',name:'currentlyReading',books:[]};
      let wantToReadShelf={title:'Want to Read',name:'wantToRead',books:[]};
      let readShelf={title:'Read',name:'read',books:[]};
      /*
      	didn't use filter function for efficienty
        const currentResdingBooks=allBooks.filter(book=>book.shelf===shelf.name);      
      	const readBooks=allBooks.filter(book=>book.shelf==='read');
      	const wantToReadBooks=allBooks.filter(book=>book.shelf==='wantToRead');
      */
      allBooks.forEach(book=>{
        if(book.shelf===readingShelf.name){
          readingShelf.books.push(book);
        }else if(book.shelf===wantToReadShelf.name){
          wantToReadShelf.books.push(book);
        }else if(book.shelf===readShelf.name){
          readShelf.books.push(book);
        }        
      });
      shelves.push(readingShelf);
      shelves.push(wantToReadShelf);
      shelves.push(readShelf);        
      this.setState({ shelves})
      //console.log("ALL SHELVES===:"+this.state.shelves);
    });
   
  }
  
  checkBookShelf=(book)=>{
    for (var i=0; i < this.state.shelves.length; i++) {
        const books=this.state.shelves[i].books;
        for (var j=0; j < books.length; j++) {
          if (books[j].id === book.id) {
              return books[j];
          }
        }
    }
    return {};    
  }
 
  onShelfSelect=(event,book)=>{
    //console.log("==================onShelfSelect :"+book.shelf+"/"+book.id+"/"+event.target.value);   
    if(event.target.value&&event.target.value!==book.shelf){     
   	   BooksAPI.update(book,event.target.value).then(() => {
       this.refreshShelves();
     });
    }
  }
  render() {   
    return (      
      <div className="app">  
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
    
            <div className="list-books-content">                
    			{
                  this.state.shelves.map(shelf=> (                           
                   <BookShelf  shelf={shelf} onShelfSelect={this.onShelfSelect}  key={shelf.name} />
				   ))
              	}				
            </div>
            <div className='open-search'>             
 			  <Link
                to='/search'
                className='open-search'
              >Add a book</Link>
            </div>
			
          </div>      
        )}/>
        <Route path='/search' render={({ history }) => (
          	<SearchBook
              onShelfSelect={this.onShelfSelect}
              checkBookShelf={this.checkBookShelf}
              onSearchBook={(book) => {             
              history.push('/')
            }}/>
        )}/>  
      </div>
    )
  }
}

export default BooksApp
