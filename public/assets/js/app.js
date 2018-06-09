// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });


// Whenever someone clicks a p tag
$(document).on("click", "#add-notes", function() {
  
	
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
	// Empty the notes from the note section
	$("#notes"+thisId).empty();
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/Games/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes"+data._id).append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes"+data._id).append("<label for='title'>Subject</label><input id='titleinput' name='title' class='form-control'>");
      // A textarea to add a new note body
      $("#notes"+data._id).append("<label for='body'>Note</label><textarea id='bodyinput' name='body' class='form-control'></textarea><br/>");
      // A button to submit a new note, with the id of the article saved to it
			$("#notes"+data._id).append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// Whenever someone clicks delete notes button
$(document).on("click", "#delete-notes", function() {
  
	
  // Save the id from the p tag
	var thisId = $(this).attr("data-id");
	// Empty the notes from the note section
	$("#notes"+thisId).empty();
  // Now make an ajax call for the Article
  $.ajax({
    method: "PUT",
    url: "/RemoveGameNotes/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the game from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/Games/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes"+data._id).empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


