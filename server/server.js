// Application server
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const answers = require("./models/answers");
const questions = require("./models/questions");
const tags = require("./models/tags");
const users = require("./models/users");

const app = express();
const port = 8000;

mongoose.connect("mongodb://127.0.0.1:27017/fake_so").catch(() => {
    console.log("Unable to connect to MongoDB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.listen(port);

app.get("/questions", (req, res) => {
    questions.find({}).then(questions => {
        res.send(questions);
    })
});
app.get("/question", (req, res) => {
    questions.findById(req.query.qid, (err, results) => {
        if(err)
            res.send(false);
        else
            res.send(results);
        console.log(results);
    });
});
app.get("/tags", (req, res) => {
    tags.find({}).then(tags => {
        res.send(tags);
    })
});
app.get("/user", (req, res) => {
    users.findById(req.query.token, "-password", (err, user) => {
        if(err)
            res.send(false);
        else
            res.send(user);
    });
});
app.get("/validate", (req, res) => {
    if(!req.query.token)
        res.send(false);
    else
        users.find({ id: req.query.token }, (err, query) => {
            if(query.length > 0)
                res.send(true);
            else
                res.send(false);
        });
});

app.put("/login", (req, res) => {
    users.find({ email: req.body.email }, (err, query) => {
        if(query.length === 0)
            res.send(false);
        else {
            bcrypt.compare(req.body.password, query[0].password, (err, result) => {
                if(!result)
                    res.send(false);
                else
                    res.send(query[0].id);
            });
        }
    });
});
app.put("/signup", (req, res) => {
    users.find({ email: req.body.email }, (err, query) => {
        if(query.length > 0)
            res.send(false);
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                users.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                }, (err, result) => {
                    res.send(result.id);
                });
            });
        }
    });
});
app.put("/vote", (req, res) => {
    if(req.body.type === "question")
        questions.findById(req.body.id, (err, question) => {
            if(err)
                res.send(false);
            else {
                question.votes += req.body.amount;
                question.save();
            }
        });
    if(req.body.type === "answer")
        answers.findById(req.body.id, (err, answer) => {
            if(err)
                res.send(false);
            else {
                answer.votes += req.body.amount;
                answer.save();
            }
        });
    res.send(true);
});
app.post("/question", (req, res) => {
    users.find({ _id: req.body.token }, async (err, query) => {
        if(err || query.length != 1)
            res.send(false);
        else {
            let splitTags = req.body.tags.split(" ");
            let tagIds = [];
            for(let i = 0; i < splitTags.length; i ++) {
                let tag = await tags.create({
                    name: splitTags[i]
                });
                tagIds.push(tag);
            }
            questions.create({
                title: req.body.title,
                summary: req.body.summary,
                text: req.body.text,
                tags: tagIds,
                asked_by: query[0].username
            }).then((question) => {
                query[0].questionsCreated.push(question);
                query[0].tagsCreated.push(...tagIds);
                query[0].save();
                res.send(true);
            });
        }
    });
});
app.post("/answer", (req, res) => {
    questions.findById(req.body.for, (err, question) => {
        if(err)
            res.send(false);
        else {
            users.findById(req.body.token, (err, user) => {
                if(err)
                    res.send(false);
                else {
                    answers.create({
                        text: req.body.text,
                        ans_by: user.username
                    }).then((answer) => {
                        question.answers.push(answer);
                        question.save();
                        user.answersCreated.push(answer);
                        user.save();
                        res.send(true);
                    });
                }
            })
        }
    });
});
app.post("/views", (req, res) => {
    questions.findById(req.body.id, (err, question) => {
        if(err)
            res.send(false);
        else {
            question.views ++;
            question.save();
            res.send(true);
        }
    });
});
