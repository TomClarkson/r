import React from 'react';
import { render } from 'react-dom';
import './styles.css';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs';

const initialState = {
	gender: null,
	exactAge: null,
	ageBracket: null,
	isLoading: true,
	people: [],
	searchFailed: false
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SELECTED_GENDER':
			return {
				...state,
				gender: action.gender
			};
		case 'SELECTED_AGE_BRACKET':
			return {
				...state,
				exactAge: null,
				ageBracket: action.ageBracket
			};
		case 'TYPED_EXACT_AGE':
			return {
				...state,
				exactAge: action.exactAge,
				ageBracket: null
			};
		case 'FETCH_PEOPLE':
			return {
				...state,
				isLoading: true,
				people: [],
				searchFailed: false
			};
		case 'PEOPLE_FETCHED_SUCCESS':
			return {
				...state,
				people: action.people,
				isLoading: false	
			};
		case 'PEOPLE_FETCHED_FAILED':
			return {
				...state,
				isLoading: false,
				searchFailed: true
			};
		default: 
			return state;
	}
};      

const getPeople = (state) => {
	const searchKeys = ['exactAge', 'ageBracket', 'gender'];
	const queryString = searchKeys
		.filter(key => state[key])
		.reduce((qs, key) => {
			// if its an empty query string lets prepend ?
			if(!qs) {
				return `?${key}=${state[key]}`;
			}

			// add on key value to query string
			return `${qs}&${key}=${state[key]}`;
		}, '');

	const baseUrl = process.env.NODE_ENV === 'development' ? 
		'http://localhost:3001' : '';
	
	return Observable
	  .ajax({
	    method: 'GET',
	    url: `${baseUrl}/people/${queryString}`,
	    crossDomain: true,
	    responseType: 'json',
	  })
};

const triggerFetchPeopleEpic = action$ =>
		action$
			.ofType('SELECTED_GENDER', 'SELECTED_AGE_BRACKET', 'TYPED_EXACT_AGE')
			.distinctUntilChanged() // only trigger search if action data is different than previous
			.mapTo({type: 'FETCH_PEOPLE'})

const fetchPeopleEpic = (action$, { getState }) => 
	action$
		.ofType('FETCH_PEOPLE')
		.switchMap(() =>
			getPeople(getState())
				.map(r => r.response)
        .map((people) => ({
        	type: 'PEOPLE_FETCHED_SUCCESS',
        	people
        }))
				.retry(2)
				.catch((e) => {
					return Observable.of({type: 'PEOPLE_FETCHED_FAILED'});
				})
		)

const rootEpic = combineEpics(
	triggerFetchPeopleEpic,
  fetchPeopleEpic
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	composeEnhancers(
    applyMiddleware(epicMiddleware)
  )
);

store.dispatch({type: 'FETCH_PEOPLE'});

const App = () => (
	<Provider store={store}>
		<div>
			<SearchForm />
			<SearchResults />
		</div>
	</Provider>
);

render(<App />, document.querySelector('#root'));