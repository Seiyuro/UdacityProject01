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
		this.setState({query: query.trim()})
		BooksAPI.search(query).then((books) => {
			if (books){
				if (books.error !== "empty query") {
					this.setState({books});
				} else {
					this.setState({books:[]});
				}
			}
		});
	}

	componentDidMount() {
	  BooksAPI.getAll().then(books => {
	    this.setState({books});
	  });
	}



	render(){
		const { moveToSection } = this.props;
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
			    		  	<div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${books.imageLinks.thumbnail})` }}>
			    		  	</div>
			    		    <BookMenu section={books.shelf} books={books} moveToSection={moveToSection} />
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