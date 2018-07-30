import React, { Component } from 'react';

class Event extends Component {

    constructor(props){
        super(props);
        this.state = {
            close : false
        }
    }

    onMouseEnter = ()=>{
        this.setState({
            close: true
        })
    }

    onMouseLeave = ()=>{
        this.setState({
            close: false
        })
    }

    onDelete = ()=>{
        this.props.onDelete(this.props.id)
    }

    render() {
        var {event,left,width} = this.props
        var eventStyle = {
            top: event.start/60*200 ,
            left: left + '%',
            width: width + '%',
            height: (event.duration/60)*200+'px'
        }
        return (
            <div className="event" style={eventStyle} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                {this.state.close ? <span id="close" onClick={this.onDelete}/> : ''}
                <div className="event-title">
                    {event.title}
                </div>
            </div>
        );
    }
}

export default Event;
