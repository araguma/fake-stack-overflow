import React from "react";

export default class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upvoted: false,
            downvoted: false
        }
    }
    render() {
        return (
            <div className = "answer">
                {this.props.showVotes && <div className = "answer-voting">
                    <div className = "answer-upvote" onClick = {() => {
                        this.props.handleUpvote(this.props.data._id, "answer");
                        this.setState({ upvoted: true, downvoted: false });
                    }} style = {{
                        borderBottomColor: this.state.upvoted ? "#2ecc71" : "#A2A2A2"
                    }}></div>
                    <span className = "answer-votes">{(this.props.data.votes ?? 0) + this.state.upvoted - this.state.downvoted}</span>
                    <div className = "answer-downvote" onClick = {() => {
                        this.props.handleDownvote(this.props.data._id, "answer");
                        this.setState({ upvoted: false, downvoted: true });
                    }} style = {{
                        borderTopColor: this.state.downvoted ? "#e74c3c" : "#A2A2A2"
                    }}></div>
                </div>}
                <div className = "answer-section">
                    <span className = "question-row" id = "answer-text">{this.props.data.text}</span>
                    <span className = "answer-row" id = "answer-created">Answered By {this.props.data.ans_by} on {this.props.data.ans_date_time}</span>
                    <hr/>
                </div>
            </div>
        );
    }
}
