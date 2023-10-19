import React from "react";
import axios from "axios";

import Navbar from "./navbar.jsx";
import Header from "./header.jsx";
import Question from "./question.jsx";

const url = "http://localhost:8000";

export default class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guest: true,
            questions: [],
            header: "All Questions",
            search: null
        };
        axios.get(url + "/validate", { params: { token: localStorage.getItem("token") } }).then((res) => {
            if(res.data)
                this.setState({ guest: false });
        });
        axios.get(url + "/questions").then((res) => {
            if(this.state.search === null)
                this.setState({ questions: res.data });
            else {
                let args = this.state.search.split(" ");
                this.setState({ questions: res.data.filter((value) => {
                    for(let i = 0; i < args.length; i ++) {
                        if(args[i].match(/^\[.+\]$/)) {
                            let tag = args[i].substring(1, args[i].length - 1);
                            for(let j = 0; j < value.tags.length; j ++)
                                if(value.tags[j].name == tag)
                                    return true;
                        } else if(value.text.includes(args[i]))
                            return true;
                    }
                    return false;
                }) })
            }
        })
    }
    componentDidMount() {
        const args = window.location.href.split("/");
        if(args.length > 4) {
            const decoded = decodeURI(args[4]);
            this.setState({ header: `Search results for: ${decoded}`, search: decoded + "" });
        }
    }
    render() {
        return (
            <>
                <Navbar/>
                {
                    this.state.guest ?
                    <Header title = {this.state.header} button = {false} link = "/questionForm"/> :
                    <Header title = {this.state.header} button = "Ask Question" link = "/questionForm"/>
                }
                <div id = "questions">
                    {this.state.questions.map((question, i) => {
                        return <Question data = {question} key = {i}/>
                    })}
                </div>
            </>
        );
    }
}
