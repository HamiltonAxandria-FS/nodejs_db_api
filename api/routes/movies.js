const express = require("express");
const { default: mongoose } = require("mongoose");
const movie = require("../routes/models/movie");
const router = express.Router();
const Movie = require("../routes/models/movie");

router.get("/", (req,res,next) => {
    const getMovie = {
        title: req.body.title,
        producer: req.body.producer
    };
    Movie.find({
        title: req.body.title,
        producer: req.body.producer
    }, )
        .then(result => {
        res.status(200).json({
            message: "GET Movie",
            movie: {
                title: result.title,
                producer: result.producer,
            },
            metadata: {
                host: req.hostname,
                method: req.method,
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

router.post("/", (req,res,next) => {
    movie.find({
        title: req.body.title, 
        producer: req.body.producer
    })
    .exec()
    .then(result => {
        console.log(result);
        if(result.length > 0){
            return res.status(406).json({
                message: "Book is already cataloged"
            })
        }
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
    })
    .catch(err => {
        console.error(err.message);
        res.status(500).json({
            error: {
                message: "Unable to save book"
            }
        });
    }); 
});

router.get("/:movieId", (req,res,next) => {
    const movieId = req.params.movieId;
    const getMovieId = {
        title: req.body.title,
        producer: req.body.producer
    };
    Movie.findById({
        _id:movieId,
    } )
        .then(result => {
        res.status(200).json({
            message: "GET Movie by Id",
            movie: {
                title: result.title,
                producer: result.producer,
                id: result._id
            },
            metadata: {
                host: req.hostname,
                method: req.method,

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

router.patch("/:movieId", (req,res,next) => {
    const movieId = req.params.movieId;
    const updatedMovie = {
        title: req.body.title,
        producer: req.body.producer
    };
    Movie.updateOne({
        _id:movieId,
    }, {
        $set: updatedMovie
    }).then(result => {
        res.status(200).json({
            message: "Updated Movie",
            movie: {
                title: result.title,
                producer: result.producer,
                id: result._id
            },
            metadata: {
                host: req.hostname,
                method: req.method,
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    })
});

router.delete("/:movieId", (req,res,next) => {
    const movieId = req.params.movieId;
    const deleteMovie = {
        title: req.body.title,
        producer: req.body.producer
    };
    Movie.deleteOne({
        _id: movieId
    },{
        $set: deleteMovie
    }).then (result => {
        res.status(200).json({
            message: "Movie Deleted",
            movie: {
                title: result.title,
                producer: result.producer,
                id: result._id
            },
            metadata: {
                host: req.hostname,
                method: req.method,
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    })
});

module.exports = router;