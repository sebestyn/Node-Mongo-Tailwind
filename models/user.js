const mongoose = require("mongoose");
const fetch = require("node-fetch");
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require("mongoose-unique-validator");

const schema = new Schema({
    name: { type: String, required: true, trim: true },
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("user", schema);
