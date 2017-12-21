import React from 'react'
import './App.css';
import BooksShelf from './BooksShelf';
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import  SearchComponent from "./SearchComponent"
import update from 'immutability-helper';

class BooksApp extends React.Component {
  
  constructor() {
    super();

    this.state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      updateState: false
    }
    this.moveToSection = this.moveToSection.bind(this);  
    this.updateShelf = this.updateShelf.bind(this);  

  }
  
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books,
        "currentlyReading": books.filter(books => { return books.shelf === "currentlyReading"}),
        "wantToRead": books.filter(books => { return books.shelf === "wantToRead"}),
        "read": books.filter(books => { return books.shelf === "read"})
      })
    });
  }

  booksFilter(books, filter) {
    return books.filter(book => { return book.shelf === filter; });
  }

  moveToSection(book, move) {
    window.this1 = this;
      if (move !== "none"){
        book.shelf = move;
      }
    if (move !== "none") {
      BooksAPI.update(book, move).then((booksResult) => {
        let myBooks = update(this.state[move], {$push:[book]});
        this.setState({[move]:myBooks});
        this.updateShelf(booksResult, book, move)
      });
    }
  }

  updateShelf(id, book, move){
      const newCurrentlyReading = this.state.currentlyReading.filter((book, index) => { return book.id === id.currentlyReading[index] });
      const newWanToRead = this.state.wantToRead.filter((book, index) => { return book.id === id.wantToRead[index] });
      const newRead = this.state.read.filter((book, index) => { return book.id === id.read[index] });
      const prevBooks = this.state.books || [];
      const newBooks = (id.currentlyReading).concat(id.wantToRead).concat(id.read).reduce((books, bookId) => {
        const changeBook = prevBooks.find(b => { 
          return b ? (b.id === bookId) : {}; 
        });
        if (changeBook) {
          if (changeBook.id === book.id) {
            changeBook.shelf = move; 
          }
          books.push(changeBook);        
        }
        return books;

      }, []);
      this.setState({ 
        "books": newBooks,
        "currentlyReading": newCurrentlyReading,
        "wantToRead": newWanToRead,
        "read": newRead
      })
  }

  render() {
    return (
      <div className="app">
        <Route  path="/search" render={() => (
          <SearchComponent books={this.state.books} moveToSection={this.moveToSection} /> )}  /> 
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                  <BooksShelf books={this.state.books} section={this.state.currentlyReading} booksFilter={this.booksFilter(this.state.books, "currentlyReading")} moveToSection={this.moveToSection} currentSection="currentlyReading"/>
              </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BooksShelf books={this.state.books} section={this.state.wantToRead} booksFilter={this.booksFilter(this.state.books, "wantToRead")} moveToSection={this.moveToSection} currentSection="wantToRead"/>                    
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BooksShelf books={this.state.books} section={this.state.read} booksFilter={this.booksFilter(this.state.books, "read")} moveToSection={this.moveToSection} currentSection="read"/>                    
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
            <Link to="/search" className="close-search" >Add a book</Link>
            </div>
          </div>


          )}/>
      </div>
    )
  }
}

export default BooksApp
