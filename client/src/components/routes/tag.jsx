import React from "react";
import { Link } from "react-router-dom";

export default class Tag extends React.Component {
    render() {
        return (
            <div className = "tag">
                <div className = "tag-row">
                    <Link to = {{ pathname: `/questions/[${this.props.name}]` }}>{this.props.name}</Link>
                </div>
                <div className = "tag-row">
                    <span className = "tag-item">{this.props.questions} questions</span>
                </div>
            </div>
        );
    }
}
