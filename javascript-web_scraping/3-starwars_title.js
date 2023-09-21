#!/usr/bin/node

const request = require('request');
const movieID = process.argv[2];
const url = `https://swapi-api.hbtn.io/api/films/${movieID}`;

request.get(url, (error, response, body) => {
  if (error || response.statusCode !== 200) {
    console.error(error);
  } else {
    const data = JSON.parse(body);
    console.log(data.title);
  }
});
