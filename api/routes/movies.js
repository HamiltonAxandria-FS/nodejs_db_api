const express = require("express");
const router = express.Router();

router.get("/", (req,res,next) => {
    res.json({
        message: "Movie-GET"
    });
});

router.post("/", (req,res,next) => {
    res.json({
        message: "Movie-POST"
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