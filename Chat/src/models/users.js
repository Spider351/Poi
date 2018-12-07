const mongoose = require("mongoose");

const { Schema } = mongoose;

const UsersSchema = new Schema({
    nick: String,
})

module.exports = mongoose.model("Users", UsersSchema);