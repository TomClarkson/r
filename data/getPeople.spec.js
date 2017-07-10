const getPeople = require('./getPeople');

const assertReturnsPeopleNamed = (...names) => (people) => {
	expect(people.map(p => p.name)).toEqual(names)
};

describe('Get people per query', () => {
 //  it('Can filter on gender', () =>
 //  	getPeople({gender: 'female'}).then((result) =>
 //  		assertReturnsPeopleNamed("Jane", "Sally")
 //  	)
 //  )
 //  it('Can filter on exact age', () =>
 //  	getPeople({exactAge: 20}).then(
 //  		assertReturnsPeopleNamed("Bob")
 //  	)
 //  )
  it('Can filter on people older than 30', () =>
  	getPeople({ageBracket: 'over30'}).then(
  		assertReturnsPeopleNamed("Jane")
  	)
  )
 //  it('Can filter on people younger than 30', () =>
 //  	getPeople({ageBracket: 'under30'}).then(
 //  		assertReturnsPeopleNamed("Bob", "Sally")
 //  	)
 //  )
 //  it('Can combine filters', () =>
	// getPeople({gender: 'male', ageBracket: 'under30'}).then(
 //  		assertReturnsPeopleNamed("Bob")
 //  	)
 //  )
});