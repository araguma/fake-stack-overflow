import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const url = "http://localhost:8000";

export default class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null
        }
        axios.get(url + "/user", { params: { token: localStorage.getItem("token") } }).then((res) => {
            if(res.data)
                this.setState({ username: res.data.username });
        });
    }
    handleLogout() {
        localStorage.removeItem("token");
    }
    handleSearch(e) {
        if(e.code == "Enter")
            window.location.replace("http://localhost:3000/questions/" + encodeURI(e.target.value));
    }
    render() {
        return (
            <div id = "navbar">
                <Link className = "navbar-link" to = {{ pathname: "/questions" }}>Questions</Link>
                <Link className = "navbar-link" to = {{ pathname: "/tags" }}>All Tags</Link>
                <input id = "navbar-search" type = "text" placeholder = "Search" onKeyUp = {(e) => this.handleSearch(e)}/>
                {
                    this.state.username ? <>
                        <Link className = "navbar-link link-right" to = {{ pathname: "/" }} onClick = {() => this.handleLogout()}>Logout</Link>
                        <Link className = "navbar-link link-right" to = {{ pathname: "/profile" }}>{this.state.username}</Link>
                    </> :
                        <Link className = "navbar-link link-right" to = {{ pathname: "/" }}>Home</Link>
                }
            </div>
        );
    }
}
