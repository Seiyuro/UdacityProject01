import React, { Component } from "react"
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookMenu from "./BookMenus"


class SearchBooks extends Component {
	state = {
		books: [],
		query: ""
	}

	updateQuery = query => {
		let currentBooksArray = this.props.books;
		this.setState({query: query})
		if (query) {
			BooksAPI.search(query.trim()).then((books) => {
				if (books){
					if (books.error !== "empty query") {
						this.setState({
							books: books.map(book => {
						 	const ownedBook = currentBooksArray.find(b => b.id === book.id);
						  	if (ownedBook) {
						    	return Object.assign({}, book, ownedBook);
						  	}
						  	return book;
							})
						});
					} else {
						this.setState({books:[]});
					}
				}
			});
		}
	}

	
	render(){
		const { moveToSection } = this.props;
		debugger
		return (
			<div className="search-books">
			 	<div className="search-books-bar">
			    <Link to="/" className="close-search" >Close</Link>
			    	<input className="search-contacts" type="text" placeholder="Search book" 
			    			value={this.state.query}
			    			onChange={event => this.updateQuery(event.target.value)} />
				</div>
			  <div className="search-books-results">
			    <ol className="books-grid">
			    	{this.state.books.map(books => (
			    		<li key={books.id}>
			    		<div className="book">
			    		  <div className="book-top">
			    		  	<div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${books.imageLinks ? books.imageLinks.thumbnail : "http://via.placeholder.com/128x193?text=No%20Cover"})` }}>
			    		  	</div>
			    		    <BookMenu section={books.shelf ? books.shelf : "none" } books={books} moveToSection={moveToSection} />
			    		   </div>  
			    		  <div className="book-title">{books.title}</div>
			    		  <div className="book-authors">{books.authors}</div>
			    		</div>
			    		</li>
					))}
			    </ol>
			  </div>
			</div>
		)
	}
}

export default SearchBooks