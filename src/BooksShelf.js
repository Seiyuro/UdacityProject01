import React, {Component} from "react";
import BookMenu from "./BookMenus"


class BookShelf extends Component {


	render() {
		const { moveToSection } = this.props;

		return (
		  <div className="bookshelf-books">
		    <ol className="books-grid">
		      {
		      	this.props.section.map(books => (

		      		<li key={books.id}>
		      		<div className="book">
		      		  <div className="book-top">
		      		  	<div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${books.imageLinks.thumbnail})` }}>
		      		  	</div>
		      		    <BookMenu section={this.props.currentSection} books={books} moveToSection={moveToSection} updateState={this.props.state}/>
		      		   </div>  
		      		  <div className="book-title">{books.title}</div>
		      		  <div className="book-authors">{books.authors}</div>
		      		</div>
		      		</li>
		      	))
		  		}
		    </ol>
		  </div>				
		);
	}
}

export default BookShelf