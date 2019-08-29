var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var app = express();
var port = 3000;

var url = "mongodb://localhost:27017/";



app.get("/", (req, res) => {
 res.send("Hello World");
});

app.get("/createMovieList", (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("cineplex");
        var Obj = [
                    {
                        name: "Harry Potter and the Order of the Phoenix",
                        img: "https://bit.ly/2IcnSwz",
                        summary: "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry."
                    }, 
                    {
                        name: "The Lord of the Rings: The Fellowship of the Ring",
                        img: "https://bit.ly/2tC1Lcg",
                        summary: "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed."
                    }, 
                    {
                        name: "Avengers: Endgame",
                        img: "https://bit.ly/2Pzczlb",
                        summary: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe."
                    }
                ]
        dbo.collection("movies_list").insertMany(Obj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        })
        res.json({
            success: true,
            data: 'MovieDB Successfully create'
        })
      });
});

app.get("/getMovie", (req, res) => {
    let movieName = req.query.movieName;
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("cineplex");
        var query = { name: movieName };
        dbo.collection("movies_list").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.jsonp({
                success: false,
                data: result
            })
            db.close();
        });
    });
})
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});