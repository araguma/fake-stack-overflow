import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const url = "http://localhost:8000";

export default class Question extends React.Component {
    constructor(props) {
        super(props);
    }
    handleViews() {
        axios.post(url + "/views", { id: this.props.data._id});
    }
    render() {
        return (
            <div className = "question">
                <div>
                    <span className = "question-info">{this.props.data.views} Views</span>
                    {!this.props.hideVotes && <span className = "question-info">{this.props.data.votes} Votes</span>}
                    <span className = "question-info">{this.props.data.answers.length} Answers</span>
                </div>
                <div>
                    <Link className = "question-row" id = "question-title" to = {{ pathname: `/answers/${this.props.data._id}` }} onClick = {() => this.handleViews()}>{this.props.data.title}</Link>
                    <span className = "question-row" id = "question-summary">{this.props.data.summary}</span>
                    <div className = "question-row" id = "question-tags">
                        {this.props.data.tags.map((tag, i) => {
                            return <span className = "question-tag" key = {i}>{tag.name}</span>;
                        })}
                    </div>
                    <span className = "question-row" id = "question-created">Asked by {this.props.data.asked_by} on {this.props.data.ask_date_time}</span>
                </div>
                <hr></hr>
            </div>
        );
    }
}
