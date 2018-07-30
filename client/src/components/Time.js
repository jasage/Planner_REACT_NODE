import React, { Component } from 'react';

class Time extends Component {
    render() {
        var {hour} = this.props
        return (
            <div className="time-frame d-flex flex-column align-items-center">
                <span className="time main-time">{hour}:00</span>
                <span className="time half-time">{hour}:30</span>
            </div>
        );
    }
}

export default Time;
