import React from 'react'
import './App.css';
import Shelf from './BooksShelf';
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import  SearchBooks from "./SearchComponent"

class BooksApp extends React.Component {
  
  constructor() {
    super();

    this.state = {
      showSearchPage: false,
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

    let myBooks = this.state[move];
    myBooks.push(book);
    this.setState({move : myBooks});
  
    BooksAPI.update(book, move).then((books) => this.updateShelf(books));
  }

  updateShelf(id){
    this.setState({ 
      "currentlyReading": this.state.currentlyReading.filter((book, index) => { return book.id === id.currentlyReading[index] }),
      "wantToRead": this.state.wantToRead.filter((book, index) => { return book.id === id.wantToRead[index] }),
      "read": this.state.read.filter((book, index) => { return book.id === id.read[index] })
    })
  }

  render() {
    return (
      <div className="app">
        <Route  path="/search" render={() => (
          <SearchBooks books={this.state.books} moveToSection={this.moveToSection} /> )}  /> 
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                  <Shelf books={this.state.books} section={this.state.currentlyReading} booksFilter={this.booksFilter(this.state.books, "currentlyReading")} moveToSection={this.moveToSection} currentSection="currentlyReading"/>
              </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <Shelf books={this.state.books} section={this.state.wantToRead} booksFilter={this.booksFilter(this.state.books, "wantToRead")} moveToSection={this.moveToSection} currentSection="wantToRead"/>                    
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <Shelf books={this.state.books} section={this.state.read} booksFilter={this.booksFilter(this.state.books, "read")} moveToSection={this.moveToSection} currentSection="wantToRead"/>                    
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
