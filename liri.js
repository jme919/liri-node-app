require("dotenv").config();
var request = require("request");
var myKeys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");






//access my api keys//
var spotify = new Spotify(myKeys.spotify);
var client = new Twitter(myKeys.twitter);

//variable for users input//
var userCommand = process.argv[2];
var userRequest = process.argv[3];



//show last 20 tweets//


function mytweets(){
  var param = {
  	screen_name: "tunammez",
  	count: 20
  };
  client.get("statuses/user_timeline", param, function(error, tweets, response){

  // If the request was successful...
  if (!error && response.statusCode === 200) {
  	for (var j = 0; j < tweets.length; j++){
  		var theTweets = ("Tweet " + (j + 1) + ":" + tweets[j].created_at + " " + tweets[j].text);
  		console.log("============================================================");
  		console.log(theTweets);

  	}

    
  }
  if(error) throw error;

});


}

if(userCommand === "my-tweets"){
	mytweets();

}


//show artist, song name, preview link, and album from spotify//

var song = userRequest;
//var defaultSong = "the sign";
// if(userRequest === ""){
// 	song = "Everyday";
    //}else{
    // 	song = userRequest;
    // }

   if( userCommand === "spotify-this-song"){
	spotifyThisSong();
	 }
	 
	
	



function spotifyThisSong(userRequest){
	spotify.search({type: "track", query: song, limit: 1}, function(err, data){
		console.log(data);
		if (err){
			return console.log("Error: " + err);
		}

		for(var i = 0; i < data.tracks.items.length; i++){
			var songData = data.tracks.items[i];
			console.log("=====================================================");
			console.log("Song: " + songData.name);
			console.log("Artist: " + songData.artists[0].name);
			console.log("Album: " + songData.album.name);
			console.log("Preview Link: " + songData.external_urls.spotify);
			console.log("====================================================");
		  }
		  
		});
	
       }
	
	




//Show movie title, year, IMDB rating, Rotten Tom rating, country, language, plot, actors//
function movieThis(){

	var queryMov = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=trilogy";

	request(queryMov, function(error, response, body){
		if(!error && response.statusCode === 200) {
			console.log("======================================================");
			console.log("Title: " + JSON.parse(body).Title);
			console.log("IMDB Rating: " + JSON.parse(body).Year);
			console.log("Rotten Tomatoe Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Produced In: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Actors: " + JSON.parse(body).Actors);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("=======================================================");
		}
	});

}

if(userCommand === "movie-this"){
	movieThis();

}


//use fs Node package, LIRI will take the text inside random.txt and the use it to call one of the LIRI commands
if(userCommand === "do-what-it-says")
	doIt();
function doIt(){
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var song = data.split(",")[1];

  // We will then re-display the content as an array for later use.
  spotifyThisSong(song);

});
}