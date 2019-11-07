import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email:String,
    password:String,
    address: String
});

var UserModel = mongoose.model("Love", userSchema);

module.exports = UserModel;