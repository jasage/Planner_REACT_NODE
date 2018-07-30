import React, { Component } from 'react';
import AddEventForm from './../components/AddEventForm';
import AddFileForm from './../components/AddFileForm';
import { connect } from "react-redux";
import { addEvent,fetchEvents } from '../actions';

class AddEventContainer extends Component {
    addEvent=(data, type)=>{
        const { start , end } = this.props.time;
        if(type === 'ADD_EVENT' && data.hour>=start){
            // Formating data before send
            const maxDuration = (end - data.hour)*60 - data.minute;
            this.props.dispatch(addEvent(
                {
                start: (data.hour - start)*60 + data.minute,
                duration: data.duration > maxDuration ? maxDuration : data.duration,
                title: data.title
                }
            ))
            this.props.dispatch(fetchEvents());
            return;
        }
       if(type === 'ADD_FROM_FILE'){
            // Formating data form file
            const maxDuration = (end - start)*60;
            const events = data.map(event=>{
                if(event.duration > maxDuration - event.start){
                    event.duration = maxDuration - event.start;
                }
                return event
            });
            
            if(events){
                this.props.dispatch(addEvent(events));
                this.props.dispatch(fetchEvents());
            }
       }
    }

    render() {
        return (
            <div className="row input-form">
                <div className="col">
                    <AddEventForm time={this.props.time} addEvent={this.addEvent}/>
                </div>
                <div className="col">
                    <AddFileForm addEvent={this.addEvent}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        time: state.time
    }
}
// const mapDispatchToProps = (dispatch, props)=>{
//     return {
//         addEvent: (data)=>{
//             dispatch(addEvent(data))
//         }
//     }
// }
export default connect(mapStateToProps)(AddEventContainer);
