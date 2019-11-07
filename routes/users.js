import express from "express";
import User from "../schema/User"
import mongoose from "mongoose";
var ObjectId = require('mongoose').Types.ObjectId; 
var auth = require('basic-auth')
var compare = require('tsscmp')

const router = express.Router();

router.get("/", (req, res, next) => {
    var credentials = auth(req)
    // console.log(credentials)
    if (!credentials || !check(credentials.name, credentials.pass)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
  } else {
    res.end('Access granted')
  }

    // res.status(200).json({
    //     message:"Serving Users on the Endpoint."
    // });   
});
function check (name, pass) {
  var valid = true
 
  // Simple method to prevent short-circut and use timing-safe compare
  valid = compare(name, 'satnam') && valid
  valid = compare(pass, 'singh') && valid
 
  return valid
}
router.get("/list/:id", (req, res, next) => {

    User.findById(req.params.id3)
        .exec()
        .then(docs => {
            res.status(200).json({
                docs
            });
        })
        .catch(err => {
            res.status(404).json({
                message: err
            });
        });
});


router.get("/list", (req, res, next) => {
    User.find({})
        .exec()
        .then(docs => {
            res.status(200).json({
                docs
            });
        })
        .catch(err => {
            console.log(err)
        });
});

router.post("/add", (req, res, next) => {
    console.log(req.body)
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
        address:req.body.address
    });

    user.save()
    .then(result => {
        res.status(200).json({
            message:"user added successfully",
            data:[user]
        });
    })
    .catch(err => {
        res.status(404).json({
                message: err
            });
    });
});

router.put("/:id", (req,res,next)=>{

    User.findByIdAndUpdate(req.params.id, req.body)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: `${req.params.id} user is not available`
            });
        }
        res.send(note);
    }).catch(err => {
        return res.status(500).send({
            message: "Error updating user data "
        });
    });
})

router.delete("/:id", (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "No User found with id " + req.params.id
            });
        }
        res.status(200).send({message: "User deleted successfully!"});
    }).catch(err => {
        return res.status(500).send({
            message: "Error found during delete with id " + req.params.id
        });
    });
});

module.exports = router;