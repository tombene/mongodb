var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var GameSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
	},
	
	imgLink: {
		type: String,
		required: true
	},
	rank: {
		type: String,
		required: true
	},
	// geekRating: {
	// 	type: String,
	// 	required: true
	// },
	// avgRating: {
	// 	type: String,
	// 	required: true
	// },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Game with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Game = mongoose.model("Game", GameSchema);

// Export the Game model
module.exports = Game;
