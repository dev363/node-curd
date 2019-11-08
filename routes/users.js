import express from "express";
import User from "../schema/User"
import mongoose from "mongoose"
import auth from 'basic-auth'
import nodemailer from 'nodemailer'
require('dotenv').config();

const router = express.Router();

// Email Config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GmailUser,
    pass: process.env.GmailPass
  }
});

// forget password request
router.get("/forget-password", (req, res, next) => {

  if(req.query.email){
    const token=Math.floor(100000 + Math.random() * 900000)
    User.updateOne({email:req.query.email}, {
        recoveryToken:token
    })
    .exec()
    .then(doc=>{
      if(doc.nModified > 0){

        var mailOptions = {
          from: process.env.GmailUser,
          to: req.query.email,
          subject: 'Password reset email',
          text: `Please use ${token} to set your pass using POST /set-password Api call.
          Thanks`
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            res.status(404).send({message:'Unable to send email. Please try after some time.'})
          } else {
            res.status(200).send({message:'we have send password reset token. please check your email.'})
          }
        });
      }else{
          res.status(404).send({message:'No user registerd with this email.'})
      }
    })
    .catch(err=>{
      res.status(404).send({message:err.message})
    })
  }else{
    res.status(404).send({message:'Please pass email perameter in query.'})
  }
});

// Set new password request
router.post("/set-password", (req, res, next) => {
  if(req.body.email && req.body.recoveryToken && req.body.password){
    User.updateOne({email:req.body.email, recoveryToken: req.body.recoveryToken}, {
        password:req.body.password,
        recoveryToken:null
    })
    .exec()
    .then(doc=>{
      if(doc.nModified > 0){
        res.status(200).send({message:'Your password reset successfully.'})
      }else{
        res.status(404).send({message:'Please check email or recoveryToken invalid.'})
      }
    })
    .catch(err=>{
      res.status(404).send({message:err.message})
    })
  }else{
    res.status(404).send({message:'perameters not available or someone missing.Please check again.'})
  }
});

// Authorization midelware
router.use(function (req, res, next) {
  var credentials = auth(req)
  if (credentials && credentials.name!="" && credentials.pass!="") {
    User.findOne({email:credentials.name,password:credentials.pass})
    .exec()
    .then(doc=>{
      if(!doc){
        res.status(404).send({message:'Invalid user credentials'})
      }else{
        next()
      }
    })
    .catch(err=>{
      res.status(404).send({message:'Api error, Please try after some time.'})
    })
  } else {
    res.status(404).send({message:'credentials not available'})
  }
})

// get Single user data
router.get("/:id", (req, res, next) => {

    User.findById(req.params.id,{__v:0,recoveryToken:0})
        .exec()
        .then(user => {
            res.status(200).json({
                user
            });
        })
        .catch(err => {
            res.status(404).json({
                message: err
            });
        });
});


// get All user data
router.get("/", (req, res, next) => {
    User.find({},{__v:0,recoveryToken:0})
        .exec()
        .then(users => {
            res.status(200).json({
                users
            });
        })
        .catch(err => {
            res.status(404).send({message:err.message})
        });
});

// Add new User
router.post("/add", (req, res, next) => {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
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
                message: err.message
            });
    });
});

// update user data
router.put("/:id", (req,res,next)=>{
  if(req.body.email || req.body.name  || req.body.password){
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: `${req.params.id} user is not available`
            });
        }
        res.send(note);
    }).catch(err => {
        return res.status(404).send({
            message: err.message
        });
    });
  }else{
    return res.status(404).send({
        message: `No perameters pass.`
    });
  }
})

// delete user by Id
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
        return res.status(404).send({
            message: err.message
        });
    });
});

module.exports = router;
