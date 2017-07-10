const express = require('express');
const app = express();
const cors = require('cors');
const getPeople = require('./data/getPeople');

app.use(express.static('build'));

app.get('/people', cors(), (req, res) => {
  getPeople(req.query).then(results => {
    res.json(results);
  });
});

const PORT = 3001;

app.listen(PORT, function() {
  console.log('Example app listening on port ' + PORT);
});
