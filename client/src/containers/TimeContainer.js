import React, { Component } from 'react';
import { connect } from "react-redux";
import Time from "./../components/Time";

class TimeContainer extends Component {
    render() {
        var {time} = this.props;
        return (
            <div>
                {this.showTime(time)}
            </div>
        );
    }
    showTime(timePeriod){
        let listTime = []
        for(let i = timePeriod.start; i<timePeriod.end; i++){
            listTime.push(
                <Time key={i} hour={i} />
            )
        }
        return listTime;
    }
}

const mapStateToProps = state => {
    return {
        time: state.time
    }
}

export default connect(mapStateToProps)(TimeContainer);
