const mongoose = require("mongoose");

const answersSchema = new mongoose.Schema({
    text: String,
    votes: {
        type: Number,
        default: 0
    },
    votes: {
        type: Number,
        default: 0
    },
    ans_by: String,
    ans_date_time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Answer", answersSchema);
