import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Errors from "./errors.jsx";

const url = "http://localhost:8000";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true,
            errors: []
        };
        this.loginInfo = {
            email: "",
            password: ""
        }
        this.signupInfo = {
            username: "",
            email: "",
            confirm: "",
            password: ""
        }
    }
    handleLogin(e) {
        e.preventDefault();
        axios.put(url + "/login", this.loginInfo).then((res) => {
            if(!res.data) {
                this.setState({ errors: ["Incorrect email or password"] });
            } else {
                localStorage.setItem("token", res.data);
                window.location.replace("http://localhost:3000/questions");
            }
        });
    }
    handleSignup(e) {
        e.preventDefault();
        let errors = [];
        if(this.signupInfo.username.length < 8)
            errors.push("Username must be over 8 characters");
        if(this.signupInfo.email.length < 3)
            errors.push("Invalid email");
        if(this.signupInfo.password.length < 8)
            errors.push("Password must be over 8 characters");
        if(this.signupInfo.confirm != this.signupInfo.password)
            errors.push("Passwords do not match");
        if(errors.length === 0)
            axios.put(url + "/signup", this.signupInfo).then((res) => {
                if(!res.data) {
                    errors.push("Email already exists");
                    this.setState({ errors: errors });
                } else {
                    localStorage.setItem("token", res.data);
                    window.location.replace("http://localhost:3000/questions");
                }
            });
        this.setState({ errors: errors });
    }
    handleGuest() {
        localStorage.removeItem("token");
    }
    render() {
        return (
            <div id = "welcome">
                <div id = "welcome-message">
                    <div id = "message">
                        <span id = "message-medium">Welcome to</span>
                        <span id = "message-large">Fake Stackoverflow</span>
                        <span id = "message-small">Fake Stackoverflow is a question and answer site for professional and enthusiast programmers. It's built and run by you as part of the Stack Exchange network of Q&A sites. With your help, we're working together to build a library of detailed, high-quality answers to every question about programming.</span>
                    </div>
                </div>
                <div id = "welcome-entry">
                    <div id = "entry">
                        <div id = "entry-switch">
                            <button className = "entry-button" style = {{
                                backgroundColor: (this.state.showLogin ? "#000" : "#FFF"),
                                color: (this.state.showLogin ? "#FFF" : "#000")
                            }} id = "entry-left" onClick = {() => this.setState({ showLogin: true, errors: [] })}>Log in</button>
                            <button className = "entry-button" style = {{
                                backgroundColor: (!this.state.showLogin ? "#000" : "#FFF"),
                                color: (!this.state.showLogin ? "#FFF" : "#000")
                            }} id = "entry-right" onClick = {() => this.setState({ showLogin: false, errors: []  })}>Sign up</button>
                        </div>
                        <div id = "entry-forms">
                            {this.state.showLogin && <form id = "login">
                                <label className = "fso-label">Email</label>
                                <input className = "fso-text" type = "text" onChange = {e => this.loginInfo.email = e.target.value}/>
                                <label className = "fso-label">Password</label>
                                <input className = "fso-text" type = "password" onChange = {e => this.loginInfo.password = e.target.value}/>
                                <input className = "fso-button entry-submit" type = "submit" value = "Log In" onClick = {(e) => this.handleLogin(e)}/>
                            </form>}
                            {!this.state.showLogin && <form id = "signup">
                                <label className = "fso-label">Username</label>
                                <input className = "fso-text" type = "text" onChange = {e => this.signupInfo.username = e.target.value}/>
                                <label className = "fso-label">Email</label>
                                <input className = "fso-text" type = "text" onChange = {e => this.signupInfo.email = e.target.value}/>
                                <label className = "fso-label">Password</label>
                                <input className = "fso-text" type = "password" onChange = {e => this.signupInfo.password = e.target.value}/>
                                <label className = "fso-label">Confirm Password</label>
                                <input className = "fso-text" type = "password" onChange = {e => this.signupInfo.confirm = e.target.value}/>
                                <input className = "fso-button entry-submit" type = "submit" value = "Sign Up" onClick = {(e) => this.handleSignup(e)}/>
                            </form>}
                            <Errors errors = {this.state.errors}/>
                        </div>
                    </div>
                    <Link id = "guest-link" to = {{ pathname: "/questions" }} onClick = {() => this.handleGuest()}>Continue as guest</Link>
                </div>
            </div>
        );
    }
}
