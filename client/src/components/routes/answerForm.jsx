import React from "react";
import axios from "axios";

import Navbar from "./navbar.jsx";
import Header from "./header.jsx";
import Errors from "./errors.jsx";

const url = "http://localhost:8000";

export default class AnswerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        };
        this.answer = {
            text: "",
            for: window.location.href.split("/").pop(),
            token: localStorage.getItem("token")
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        let errors = [];
        if(this.answer.text.length < 10)
            errors.push("Answer must be at least 10 characters");
        if(errors.length === 0) {
            axios.post(url + "/answer", this.answer).then((res) => {
                if(!res.data) {
                    errors.push("Unable to post answer");
                    this.setState({ errors: errors });
                } else {
                    window.location.replace("http://localhost:3000/answers/" + this.answer.for);
                }
            });
        }
        this.setState({ errors: errors });
    }
    render() {
        return (
            <>
                <Navbar/>
                <Header title = "Answer Question" button = {false}/>
                <div className = "fso-form">
                    <form>
                        <label className = "fso-label">Text</label>
                        <textarea className = "fso-text fso-form-text" type = "text" onChange = {e => this.answer.text = e.target.value}/>
                        <input className = "fso-button entry-submit" type = "submit" value = "Submit" onClick = {(e) => this.handleSubmit(e)}/>
                    </form>
                    <Errors errors = {this.state.errors}/>
                </div>
            </>
        );
    }
}
