import React from "react";

export default class Errors extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <>
                {this.props.errors.map((error, i) => {
                    return <span className = "fso-error" key = {i}>{error}</span>
                })}
            </>
        );
    }
}
