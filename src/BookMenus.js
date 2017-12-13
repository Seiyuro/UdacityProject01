import React, {Component} from "react";

class BookMenu extends Component {
	render() {
		return (
			<div className="book-shelf-changer">
			  <select onChange={ event => this.props.moveToSection(this.props.books, event.target.value)} value={this.props.section}>
			    <option value="disabled" disabled>Move to...</option>
			    <option value="currentlyReading">Currently Reading</option>
			    <option value="wantToRead">Want to Read</option>
			    <option value="read">Read</option>
			    <option value="none">None</option>
			  </select>
			</div>
		)
	}
}

export default BookMenu
