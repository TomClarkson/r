import React, { Component } from 'react';
import './searchResults.css';
import { connect } from 'react-redux';

class SearchResults extends Component {
	render() {
		const { isLoading, searchFailed, people } = this.props;
		return (
			<div className="box">
				{isLoading &&
					<p>Loading...</p>	
				}
				{people.map(p =>
					<p key={p._id}>{p.name}</p>
				)}
				{people.length === 0 && !isLoading && !searchFailed &&
					<p>No results match your search</p>
				}
				{searchFailed &&
					<div className="searchFailed">
						<p>Search failed please try again later</p>
					</div>
				}
			</div>
		);
	}
}

export default connect(state => state)(SearchResults);