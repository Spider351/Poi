const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChatSchema = new Schema({
    nick: String,
    msg: String,
})

module.exports = mongoose.model("Chat", ChatSchema);