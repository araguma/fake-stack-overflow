import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "./navbar.jsx";
import Header from "./header.jsx";
import Question from "./question.jsx";
import Answer from "./answer.jsx";

const url = "http://localhost:8000";

export default class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guest: true,
            question: {
                answers: []
            },
            upvoted: false,
            downvoted: false
        };
        axios.get(url + "/validate", { params: { token: localStorage.getItem("token") } }).then((res) => {
            if(res.data)
                this.setState({ guest: false });
        });
        axios.get(url + "/question", { params: { qid: window.location.href.split("/").pop() }}).then((res) => {
            if(res.data)
                this.setState({ question: res.data });
        });
    }
    handleUpvote(id, type) {
        axios.put(url + "/vote", { id: id, type: type, amount: 1, token: localStorage.getItem("token") });
    }
    handleDownvote(id, type) {
        axios.put(url + "/vote", { id: id, type: type, amount: -1, token: localStorage.getItem("token") });
    }
    render() {
        return (
            <>
                <Navbar/>
                {
                    this.state.guest ?
                    <Header title = "Answers" button = {false} link = "/answerForm"/> :
                    <Header title = "Answers" button = "Answer Question" link = {`/answerForm/${this.state.question._id}`}/>
                }
                <div id = "answers">
                    <div className = "answer">
                        {
                            !this.state.guest && <div className = "answer-voting">
                                <div className = "answer-upvote" onClick = {() => {
                                    this.handleUpvote(this.state.question._id, "question");
                                    this.setState({ upvoted: true, downvoted: false});
                                }} style = {{
                                    borderBottomColor: this.state.upvoted ? "#2ecc71" : "#A2A2A2"
                                }}></div>
                                <span className = "answer-votes">{(this.state.question.votes ?? 0) + this.state.upvoted - this.state.downvoted}</span>
                                <div className = "answer-downvote" onClick = {() => {
                                    this.handleDownvote(this.state.question._id, "question");
                                    this.setState({ upvoted: false, downvoted: true});
                                }} style = {{
                                    borderTopColor: this.state.downvoted ? "#e74c3c" : "#A2A2A2"
                                }}></div>
                            </div>
                        }
                        <div className = "answer-section">
                            {this.state.question._id && <Question data = {this.state.question} hideVotes = {true}/>}
                        </div>
                    </div>
                    {this.state.question.answers.map((answer, i) => {
                        return <Answer data = {answer} showVotes = {!this.state.guest} key = {i} handleUpvote = {(id, type) => this.handleUpvote(id, type)} handleDownvote = {(id, type) => this.handleDownvote(id, type)}/>
                    })}
                </div>
            </>
        );
    }
}
