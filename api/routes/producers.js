const { request } = require("express");
const express = require("express");
const producer = require("./models/producer");
const router = express.Router();
const messages = require("../messages/messages");
const { producer_not_found, producer_deleted, producer_Post, producer_saved, producer_not_saved, producer_not_updated } = require("../messages/messages");


router.get("/", (req,res,next) => {
    producer.find
    .select("name: movie_id")
    .populate("Movie", "title", "producer")
    .exec()
    .then(producer => {
        if(!producer){
            console.log(producer);
            return res.status(404).json({
                message: producer_not_found
            })
        }
        res.status(201).json({
            producer: producer
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    })
});

router.post("/", (req,res,next) => {
    producer.find({
        title: req.body.title, 
        producer: req.body.producer
    })
    .select("name: movie_id")
    .populate("Moive","title", "producer")
    .exec()
    .then(result => {
        console.log(result);
        if(result.length > 0){
            return res.status(406).json({
                message: producer_Post
            })
        }
        const newProducer = new producer({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            producer: req.body.producer
           });
        newProducer.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: producer_saved,
                    producer:{
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
                message: producer_not_saved
            }
        });
    }); 
});

router.get("/:producerId", (req,res,next) => {
    const producerId = req.params.producerId;
    producer.findById(producerId)
    .select("name: movie_id")
    .populate("Movie", "title", "producer")
    .exec()
    .then(producer => {
        if(!producer){
            console.log(producer);
            return res.status(404).json({
                message: producer_not_found
            })
        }
        res.status(201).json({
            producer: producer
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    })
});

router.patch("/:producerId", (req,res,next) => {
    const producerId = req.params.producerId;
    producer.updateOne(producerId)
    .select("name: movie_id")
    .populate("Movie", "title", "producer")
    .exec()
    .then(producer => {
        if(!producer){
            console.log(producer);
            return res.status(404).json({
                message: producer_not_updated
            })
        }
        res.status(201).json({
            producer: producer
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    })
});

router.delete("/:producerId", (req,res,next) => {
    const producerId = req.params.producerId;
    producer.deleteOne({
        _id: producerId
    })
    .select("name: movie_id")
    .populate("Movie", "title", "producer")
    .exec()
    .then(result =>{
        res.status(200).json({
            message: producer_deleted,
            request: {
                method: "GET",
                url: "http://localhost3002/producers/" + producerId
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
});

module.exports = router;