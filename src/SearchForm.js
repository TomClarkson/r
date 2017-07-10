import React, { Component } from 'react';
import { connect } from 'react-redux';
import './searchForm.css';

class SearchForm extends Component {
  render() {
    const {
      gender,
      exactAge,
      ageBracket,
      selectedAgeBracket,
      selectedGender,
      typedExactAge,
    } = this.props;
    return (
      <div className="box">
        <h6>Gender</h6>
        <button
          onClick={() => selectedGender('male')}
          className={gender === 'male' ? 'selected' : ''}
        >
          Male
        </button>
        <button
          onClick={() => selectedGender('female')}
          className={gender === 'female' ? 'selected' : ''}
        >
          Female
        </button>
        <h6 style={{ marginTop: 20 }}>Age</h6>
        <input
          onChange={e => typedExactAge(e.target.value)}
          value={exactAge !== null ? exactAge : ''}
          type="number"
          placeholder="Enter age"
        />
        <button
          onClick={() => selectedAgeBracket('under30')}
          className={ageBracket === 'under30' ? 'selected' : ''}
        >
          Under 30
        </button>
        <button
          onClick={() => selectedAgeBracket('over30')}
          className={ageBracket === 'over30' ? 'selected' : ''}
        >
          Over 30
        </button>
      </div>
    );
  }
}

export default connect(state => state, {
  selectedAgeBracket: ageBracket => ({
    type: 'SELECTED_AGE_BRACKET',
    ageBracket,
  }),
  selectedGender: gender => ({ type: 'SELECTED_GENDER', gender }),
  typedExactAge: exactAge => ({ type: 'TYPED_EXACT_AGE', exactAge }),
})(SearchForm);
