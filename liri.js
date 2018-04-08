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
  		console.log(theTweets);
  	}

    
  }
  if(error) throw error;

});


}

if(userCommand === "my-tweets"){
	mytweets();

}

console.log("=====================================================================");
//show artist, song name, preview link, and album from spotify//
if(userCommand === "spotify-this-song"){
	spotifyThisSong();
	 }
	 // var defaultSong = "the sign";
	
	// if(userRequest === undefined){
	// userRequest = defaultSong;
 //    }



function spotifyThisSong(){
	spotify.search({type: "track", query: userRequest}function(err, data){
		if (!err){
		for(var i = 0; i < data.tracks.items.length; i++){
			var song = data.tracks.items[i];
			console.log("=====================================================");
			console.log("Song: " + song.name);
			console.log("Artist: " + song.artists[0].name);
			console.log("Album: " + song.album.name);
			console.log("Preview Link: " + song.preview_url);
			console.log("====================================================");
		  }
		  
		}
	
       });
	
	
	
};




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
			console.log
		}
	})

}


//use fs Node package, LIRI will take the text inside random.txt and the use it to call one of the LIRI commands
//function doWhatItSays(){

//}