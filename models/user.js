const mongoose = require("mongoose");
const fetch = require("node-fetch");
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require("mongoose-unique-validator");

const schema = new Schema({
    googleId: { type: String, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, trim: true },
    picture: { type: String, trim: true, default: "/img/no_image.png" },
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("user", schema);
