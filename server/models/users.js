const mongoose = require("mongoose");
const answersSchema = require("./answers");
const questionsSchema = require("./questions");
const tagsSchema = require("./tags");

const usersSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    reputation: {
        type: Number,
        default: 0
    },
    answersCreated: {
        type: [answersSchema.schema]
    },
    questionsCreated: {
        type: [questionsSchema.schema]
    },
    tagsCreated: {
        type: [tagsSchema.schema]
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", usersSchema);
