import React from "react";
import axios from "axios";

import Navbar from "./navbar.jsx";
import Header from "./header.jsx";
import Tag from "./tag.jsx"

const url = "http://localhost:8000";

export default class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        }
        let tags = {};
        axios.get(url + "/tags").then((res) => {
            for(let i = 0; i < res.data.length; i ++)
                tags[res.data[i].name] = tags[res.data[i].name] ? tags[res.data[i].name] + 1 : 1;
            this.setState({ tags: tags });
        });
    }
    render() {
        return (
            <>
                <Navbar/>
                <Header title = "All Tags" button = {false}/>
                <div id = "tags">
                    {(() => {
                        let tags = [];
                        for(const name in this.state.tags)
                            tags.push(<Tag name = {name} questions = {this.state.tags[name]} key = {name}/>);
                        return tags;
                    })()}
                </div>
            </>
        );
    }
}
