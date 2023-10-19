import React from "react";
import axios from "axios";

import Navbar from "./navbar.jsx";
import Header from "./header.jsx";
import Errors from "./errors.jsx";

const url = "http://localhost:8000";

export default class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        };
        this.question = {
            title: "",
            summary: "",
            text: "",
            tags: "",
            token: localStorage.getItem("token")
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        let errors = [];
        if(this.question.title.length > 50)
            errors.push("Title can not be longer than 50 characters");
        if(this.question.summary.length > 140)
            errors.push("Summary can not be longer than 140 characters");
        if(this.question.text.length < 1)
            errors.push("Text field can not be empty");
        if(this.question.tags.length < 1)
            errors.push("Question must contain a tag");
        if(errors.length === 0) {
            axios.post(url + "/question", this.question).then((res) => {
                if(!res.data) {
                    errors.push("Unable to post question");
                    this.setState({ errors: errors });
                } else {
                    window.location.replace("http://localhost:3000/questions");
                }
            });
        }
        this.setState({ errors: errors });
    }
    render() {
        return (
            <>
                <Navbar/>
                <Header title = "Ask Question" button = {false}/>
                <div className = "fso-form">
                    <form>
                        <label className = "fso-label">Title</label>
                        <input className = "fso-text fso-form-title" type = "text" onChange = {e => this.question.title = e.target.value}/>
                        <label className = "fso-label">Summary</label>
                        <textarea className = "fso-text fso-form-summary" type = "text" onChange = {e => this.question.summary = e.target.value}/>
                        <label className = "fso-label">Text</label>
                        <textarea className = "fso-text fso-form-text" type = "text" onChange = {e => this.question.text = e.target.value}/>
                        <label className = "fso-label">Tags</label>
                        <input className = "fso-text fso-form-tags" type = "text" onChange = {e => this.question.tags = e.target.value}/>
                        <input className = "fso-button entry-submit" type = "submit" value = "Submit" onClick = {(e) => this.handleSubmit(e)}/>
                    </form>
                    <Errors errors = {this.state.errors}/>
                </div>
            </>
        );
    }
}
