const express = require("express");
const router = express.Router();

router.get("/", (req,res,next) => {
    res.json({
        message: "Producers-GET"
    });
});

router.post("/", (req,res,next) => {
    res.json({
        message: "Producers-POST"
    });
});

router.get("/:producerId", (req,res,next) => {
    const producerId = req.params.producerId;
    res.json({
        message: "Producers-GET",
        id: producerId
    });
});

router.patch("/:producerId", (req,res,next) => {
    const producerId = req.params.producerId;
    res.json({
        message: "Producers-PATCH",
        id: producerId
    });
});

router.delete("/:producerId", (req,res,next) => {
    const producerId = req.params.producerId;
    res.json({
        message: "Producers-DELETE",
        id: producerId
    });
});

module.exports = router;