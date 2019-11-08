import mongoose from "mongoose";
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, lowercase: true, unique: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'],required: [true], index: true},
    email: {type: String, lowercase: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'], required: [true], index: true},
    password:{ type: String, required: true },
    recoveryToken:{type: String}
});
userSchema.plugin(uniqueValidator, {message: 'is already taken.'});
var UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
