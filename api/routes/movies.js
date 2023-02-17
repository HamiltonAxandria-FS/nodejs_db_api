const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Movie = require("../routes/models/movie");

router.get("/", (req,res,next) => {
    res.json({
        message: "Movie-GET"
    });
});

router.post("/", (req,res,next) => {
   const newMovie = new Movie({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    producer: req.body.producer
   });
   //write to the db
   newMovie.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Movie Saved",
            movie:{
                title: result.title,
                producer: result.producer,
                id: result._id,
                metadata: {
                    method: req.method,
                    host: req.hostname,
                }
            }
        });
    })
    .catch(err => {
        console.error(err.message);
        res.status(500).json({
            error: {
                message: err.message
            }
        });
    }); 
});

router.get("/:movieId", (req,res,next) => {
    const movieId = req.params.movieId;
    res.json({
        message: "Movie-GETbyID",
        id: movieId
    });
});

router.patch("/:movieId", (req,res,next) => {
    const movieId = req.params.movieId;
    res.json({
        message: "Movie-PATCHbyID",
        id: movieId
    });
});

router.delete("/:movieId", (req,res,next) => {
    const movieId = req.params.movieId;
    res.json({
        message: "Movie-DELETEbyID",
        id: movieId
    });
});

module.exports = router;