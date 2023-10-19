import React from "react";
import axios from "axios";

import Navbar from "./navbar.jsx";
import Header from "./header.jsx";
import Question from "./question.jsx";
import Answer from "./answer.jsx";
import Tag from "./tag.jsx";

const url = "http://localhost:8000";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                reputation: "",
                date_created: "",
                answersCreated: [],
                questionsCreated: [],
                tagsCreated: []
            },
            show: "questions"
        }
        axios.get(url + "/user", { params: { token: localStorage.getItem("token") } }).then((res) => {
            if(res.data)
                this.setState({ user: res.data });
        });
    }
    render() {
        return (
            <>
                <Navbar/>
                <Header title = {this.state.user.username} button = {false}/>
                <div id = "profile-info">
                    <span className = "profile-about">Reputation: {this.state.user.reputation}</span>
                    <span className = "profile-about">Member since {this.state.user.date_created}</span>
                </div>
                <div id = "profile">
                    <div id = "profile-navbar">
                        <span className = "profile-link" onClick = {() => this.setState({ show: "questions" })}>My Questions</span>
                        <span className = "profile-link" onClick = {() => this.setState({ show: "answers" })}>My Answers</span>
                        <span className = "profile-link" onClick = {() => this.setState({ show: "tags" })}>My Tags</span>
                    </div>
                    <div id = "profile-items">
                        {(() => {
                            if(this.state.show === "answers")
                                return this.state.user.answersCreated.map((answer, i) => {
                                    return <Answer data = {answer} key = {i}/>
                                })
                            if(this.state.show === "questions")
                                return this.state.user.questionsCreated.map((question, i) => {
                                    return <Question data = {question} key = {i}/>
                                })
                            if(this.state.show === "tags") {
                                let tags = {};
                                for(let i = 0; i < this.state.user.tagsCreated.length; i ++)
                                    tags[this.state.user.tagsCreated[0].name] = tags[this.state.user.tagsCreated[0].name] ? tags[this.state.user.tagsCreated[0].name] + 1 : 1;
                                let out = [];
                                for(const name in tags)
                                    out.push(<Tag name = {name} questions = {tags[name]} key = {name}/>)
                                return out;
                            }
                        })()}
                    </div>
                </div>
            </>
        );
    }
}
