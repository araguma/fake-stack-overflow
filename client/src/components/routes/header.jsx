import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id = "header">
                <span id = "header-title">{this.props.title}</span>
                {this.props.button && <Link className = "fso-button" id = "header-button" to = {{ pathname: this.props.link }}>{this.props.button}</Link>}
            </div>
        );
    }
}
