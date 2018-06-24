  require("dotenv").config();
  var fs = require("fs");
  var Twitter = require('twitter');
  var request = require("request");
  var Spotify = require('node-spotify-api');
  var Keys = require("./key.js");


  // fs.readFile("key.js", "utf8", function(error, data) {
  
  var a = process.argv[2]


  if (a === "my-tweets") {

  var client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    
    var params = {screen_name: "MyTweet18518181"};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (i=0; i <= 4; i++) {
        console.log(tweets[i].text);
        }
      }
    });
  }

  //node liri.js spotify-this-song '<song name here>'

  if (a === "spotify-this-song") {

      var b = process.argv[3]
  
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
  
  spotify.search({ type: 'track', query: b }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var songData = data.tracks.items;
    
      console.log("artist: " + songData[0].album.artists[0].name);
      console.log("song: " + songData[0].name);
      console.log("preview: " + songData[0].preview_url);
      console.log("album: " + songData[0].album.name);
     
  });
  }
  else if (b === "" && a === "spotify-this-song") {

      var spotify = new Spotify({
          id: process.env.SPOTIFY_ID,
          secret: process.env.SPOTIFY_SECRET
        });
        
        spotify.search({ type: 'track', query: 'the sign' }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }

          var songData = data.tracks.items;
    
          console.log("artist: " + songData[0].album.artists[0].name);
          console.log("song: " + songData[0].name);
          console.log("preview: " + songData[0].preview_url);
          console.log("album: " + songData[0].album.name);

  })};

  if (a === "movie-this") {

  var title = process.argv[3];
  
  if (title === ""){
    title = "mr.nobody"
  }
  request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

      if (!error) {
        var results =JSON.parse(body)
        // console.log(results)
          // * Title of the movie.
      console.log(results.Title);
      //  * Year the movie came out.
      console.log(results.Year);
      //  * IMDB Rating of the movie.
      console.log(results.imdbRating);
      //  * Rotten Tomatoes Rating of the movie.
      console.log(results.Ratings[1].Value);
      //  * Country where the movie was produced.
      console.log(results.Country);
      //  * Language of the movie.
      console.log(results.Language);
      //  * Plot of the movie.
      console.log(results.Plot);
      //  * Actors in the movie.
      console.log(results.Actors);
          // return console.log(body.Title + body.Year + body.imdbRating + body.Ratings + body.Country + body.Language + body.Plot + body.Actors);
        } else {

        console.log("error");

        }

  })

  };

  var a = process.argv[2];

  if (a === "do-what-it-says") {

      fs.readFile("random.txt", "utf8", function(error, data) {
          console.log(data);
           var x = data.split(", ");
           console.log(x);       
          if (x[0] == "spotify-this-song") {

            var spotify = new Spotify({
              id: process.env.SPOTIFY_ID,
              secret: process.env.SPOTIFY_SECRET
            });
            
            spotify.search({ type: 'track', query: x[1] }, function(err, data) {
              if (err) {
                return console.log('Error occurred: ' + err);
              }
          
              var songData = data.tracks.items;
              
                console.log("artist: " + songData[0].album.artists[0].name);
                console.log("song: " + songData[0].name);
                console.log("preview: " + songData[0].preview_url);
                console.log("album: " + songData[0].album.name);
               
            });
            

          }
          
          if (x[0] == "movie-this") {

            var title = x[1];
  
            if (title === ""){
              title = "mr.nobody"
            }
            request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
          
                if (!error) {
                  var results =JSON.parse(body)
                  // console.log(results)
                    // * Title of the movie.
                console.log(results.Title);
                //  * Year the movie came out.
                console.log(results.Year);
                //  * IMDB Rating of the movie.
                console.log(results.imdbRating);
                //  * Rotten Tomatoes Rating of the movie.
                console.log(results.Ratings[1].Value);
                //  * Country where the movie was produced.
                console.log(results.Country);
                //  * Language of the movie.
                console.log(results.Language);
                //  * Plot of the movie.
                console.log(results.Plot);
                //  * Actors in the movie.
                console.log(results.Actors);
                    // return console.log(body.Title + body.Year + body.imdbRating + body.Ratings + body.Country + body.Language + body.Plot + body.Actors);
                  }

          }

        )}

        if (x[0] == "my-tweets") {

          var client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
          });
          
          var params = {screen_name: "MyTweet18518181"};
          client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
              for (i=0; i <= 4; i++) {
              console.log(tweets[i].text);
              }
            }
          });

        }

      })

  }

  // * `do-what-it-says`
  // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

  // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
  // Feel free to change the text in that document to test out the feature for other commands.