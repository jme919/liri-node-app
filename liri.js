require("dotenv").config();
var request = require("request");
var myKeys = require("./keys.js");

var spotify = new Spotify(myKeys.spotify);
var client = new Twitter(myKeys.twitter);



//show last 20 tweets//
function mytweets(){
  request("https://api.twitter.com/1.1/statuses/user_timeline.json?Tunammez=" + client + "&count=20", function(error, response, body) {

  // If the request was successful...
  if (!error && response.statusCode === 200) {

    // Then log the body from the site!
    console.log(body);
  }
});


};

if(procees.argv[3] === "my-tweets"){
	mytweets();

}


//show artist, song name, preview link, and album from spotify//
function spotifyThisSong(){

};


//Show movie title, year, IMDB rating, Rotten Tom rating, country, language, plot, actors//
function movieThis(){

};


//use fs Node package, LIRI will take the text inside random.txt and the use it to call one of the LIRI commands
function doWhatItSays(){

};