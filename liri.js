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

console.log("=====================");

if(userCommand === "spotify-this-song"){
	spotifyThisSong();
	 }


//show artist, song name, preview link, and album from spotify//
function spotifyThisSong(userRequest){
	
	var defaultSong = "the sign";
	
	if(userRequest === undefined){
	userRequest = defaultSong;
    }

	spotify.search({type: "track", query: userRequest, limit: 1}).then(function(response, err){
		console.log(response);
		for(var i = 0; i < response.tracks.items.length; i++){
		if (!err){
			console.log("Song: " + response.tracks.items[i].name);
			console.log("Artist: " + response.track.items[i].artists[0].name);
			console.log("Album: " + response.tracks.items[i].album.name);
			console.log("Preview Link: " + response.tracks.items[i].preview_url);
		  }
		  
		}
	}).catch(function(err) {
            console.log(err);
		
       });
	
	
	
}




//Show movie title, year, IMDB rating, Rotten Tom rating, country, language, plot, actors//
//function movieThis(){

//}


//use fs Node package, LIRI will take the text inside random.txt and the use it to call one of the LIRI commands
//function doWhatItSays(){

//}