import React from 'react';

const InfoPanel = (props) => {
    return (
        <div className="ui container segment">
            <h1 className="header">{props.header}</h1>
            <div className="ui blue message">
                <div className="header">{props.cardHeader}</div>
                <p>{props.cardContent}</p>
            </div>
        </div>
    )
}

export default InfoPanel;