const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();

app.get('/', function(req, res) {

  let date = req.query.date.toLowerCase();
  let sign = req.query.sign.toLowerCase();

  let url = 'https://www.astrology.com/horoscope/daily/' + date + '/' + sign + '.html';

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html
  request(url, function(error, response, html) {

    // First we'll check to make sure no errors occurred when making the request
    if (!error) {

      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
      var $ = cheerio.load(html);

      // Finally, we'll define the variable we're going to capture
      // We'll be using Cheerio's function to single out the necessary information
      // using DOM selectors which are normally found in CSS.
      var prediction = $('div.daily-horoscope > p').text();

      // And now, the JSON format we are going to expose
      var json = {
        date: date,
        sign: sign,
        prediction: prediction
      };

      // Send the JSON as a response to the client
      res.send(json);
    }

  });

});

app.listen(process.env.PORT || 5000);
module.exports = app;
