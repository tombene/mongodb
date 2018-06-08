//NPM Dependencies
var express = require("express");
	// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
//Local Dependencies
var db = require("../models");

module.exports = function (app) {


// Require all models
var db = require("../models");

// Routes
// load index if path is blank
app.get("/", (req,res) => {
	
	db.Game.find({})
	.then(function(dbGame) {
		// If we were able to successfully find Games, send them back to the client
		var hbsObject = {
			dbGame
		};
		res.render("index",hbsObject);
	})
	.catch(function(err) {
		// If an error occurred, send it to the client
		res.json(err);
	});
});
// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  axios.get("https://boardgamegeek.com/browse/boardgame").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an Game tag, and do the following:
    $("tr#row_").each(function(i, element) {
      // Save an empty result object
      var result = {};

			// Add the text and href of every link, and save them as properties of the result object
			
      result.title = $(this).find("td.collection_objectname").children("div").find("a").text();
			result.link = "https://boardgamegeek.com" + $(this).find("td.collection_objectname").children("div").find("a").attr("href");
			result.imgLink = $(this).find("td.collection_thumbnail").find("a").find("img").attr("src");
			result.rank = $(this).find("td.collection_rank").text();
			// result.geekRating = $(this).find("td.collection_bggrating").text().split;
			// result.avgRating = $(this).find("td.")
			console.log(result);
      // Create a new Game using the `result` object built from scraping
      db.Game.create(result)
        .then(function(dbGame) {
          // View the added result in the console
          console.log(dbGame);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Game, send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for getting all Games from the db
app.get("/Games", function(req, res) {
  // Grab every document in the Games collection
  db.Game.find({})
    .then(function(dbGame) {
      // If we were able to successfully find Games, send them back to the client
      res.json(dbGame);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Game by id, populate it with it's note
app.get("/Games/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Game.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbGame) {
      // If we were able to successfully find an Game with the given id, send it back to the client
      res.json(dbGame);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Game's associated Note
app.post("/Games/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Game with an `_id` equal to `req.params.id`. Update the Game to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Game.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbGame) {
      // If we were able to successfully update an Game, send it back to the client
      res.json(dbGame);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});
}