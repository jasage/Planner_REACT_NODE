import React, { Component } from 'react';
import { connect } from "react-redux";
import Event from "./../components/Event";
import { fetchEvents, deleteEvent } from '../actions/index';

class EventContainer extends Component {
    componentDidMount(){
        this.props.dispatch(fetchEvents());
    }

    onDelete = (id) => {
        this.props.dispatch(deleteEvent(id));
        this.props.dispatch(fetchEvents());
    }

    render() {
        var { events , error } = this.props;
        return (
            <div className="col-9 event-frame">
                {this.showEvents(events,error)}
            </div>
        );
    }

    showEvents(events,error){
        if(events.length<1 || error)return;
        let listEvent = []
        events.forEach((event,index)=>{
            // Here is algorithm to position events 

            if(listEvent.length>0){
                // Get conflict events
                const conflictEvents = listEvent.filter(item=>{
                    const {start, duration} = item.props.event;
                    const endpoint = start+duration;
                    const curEndPoint = event.start+event.duration;
                    return (
                            (start <= event.start && endpoint>event.start)||
                            (start < curEndPoint && endpoint >= curEndPoint)||
                            (start > event.start && start < curEndPoint)
                        )
                })
                // If have conflicts we do...
                if(conflictEvents.length > 0 ){
                    const length = conflictEvents.length;
                    let needToChange = [];
                    let posOfNewItem = length;
                    let width = 1/(1 + length) * 100;
                    let freePlace = false;
                    // Operation with conflict events => checking => set position and width
                    conflictEvents.forEach((element,i)=>{
                        let position = i;
                        if(element.props.left>0){
                            if(i>0){
                                if(element.props.width*i < element.props.left && !freePlace){
                                    posOfNewItem = i;
                                    width = element.props.width;
                                    needToChange = [];
                                    freePlace = true;
                                    return
                                }
                            }else{
                                position = 1;
                                posOfNewItem = 0;
                            }
                            if(freePlace){
                                freePlace = false;
                                needToChange = [];
                                return
                            }
                        }
                        needToChange.push({
                            element,
                            position
                        });
                    })
                    // we got listEvents where need to change position and width
                    needToChange.forEach(item=>{
                        listEvent[item.element.key] = (<Event key={item.element.key} id={item.element.props.id} event={item.element.props.event} onDelete={this.onDelete}
                            left = {item.position*width} 
                            width = {width}/>)
                    })

                    listEvent.push(<Event key={index} id={index} event={event} onDelete={this.onDelete}
                        left = {posOfNewItem*width} 
                        width = {width}/>)
                    return;
                }
            }
            // Add event if not have any conflict
            listEvent.push(<Event key={index} id={index} event={event} onDelete={this.onDelete}
                left = {0} 
                width = {100}/>);
        })
        return listEvent;
    }
}

const mapStateToProps = state => {
    return {
        events: state.events.data,
        error: state.events.error
    }
}
export default connect(mapStateToProps)(EventContainer);
