const mongoose = require("mongoose");
const tagsSchema = require("./tags");
const answersSchema = require("./answers");

const questionsSchema = new mongoose.Schema({
    title: String,
    text: String,
    summary: String,
    tags: {
        type: [tagsSchema.schema]
    },
    votes: {
        type: Number,
        default: 0
    },
    answers: {
        type: [answersSchema.schema]
    },
    asked_by: {
        type: String,
        default: "Anonymous"
    },
    ask_date_time: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Question", questionsSchema);
