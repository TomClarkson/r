const Datastore = require('nedb');
const db = new Datastore({
  filename: __dirname + '/people.json',
  autoload: true
});

const buildAgeQuery = (exactAge, ageBracket) => {
	if(exactAge) {
		const sanitizedAge = Number(exactAge);
		return {age: sanitizedAge}; 
	}

	if(ageBracket === 'over30') {
		return {
			age: {
				$gt: 30
			}
		};
	}

	if(ageBracket === 'under30') {
		return {
			age: {
				$lt: 30
			}
		};
	}

	return {};
};

const getPeople = ({exactAge, ageBracket, gender} = {}) => {
	return new Promise((resolve, reject) => {
		const genderQuery = !gender ? {} : {gender};
		const ageQuery = buildAgeQuery(exactAge, ageBracket);
		const query = Object.assign(genderQuery, ageQuery);

		db.find(query, (error, docs) => {
			if(error) {
				return reject(error);
			}

			resolve(docs);
		});
	});
};


module.exports = getPeople;
