import React, { Component } from 'react';

class AddEventForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            hour: 0,
            minute: 0,
            duration: 1,
            title: ''
        }
    }

    onHandleChange = (e)=>{
        if(e.target.id === 'title'){
            this.setState({
                [e.target.id] : e.target.value
            })
        }else{
            this.setState({
                [e.target.id] : +e.target.value
            })
        }
    }

    onHandleSubmit = (e)=>{
        e.preventDefault();
        this.props.addEvent(this.state, 'ADD_EVENT');
    }

    render() {
        return (
            <form onSubmit={this.onHandleSubmit}>
                <div className="form-inline">
                    <label htmlFor="hour">Hour:</label>
                    <input 
                        type="number" 
                        className="form-control form-control-sm" 
                        id="hour" min={this.props.time.start} max={this.props.time.end-1}
                        onChange={this.onHandleChange}
                        required
                    />

                    <label htmlFor="minute">Minute:</label>
                    <input 
                        type="number" 
                        className="form-control form-control-sm" 
                        id="minute" min="0" max="59"
                        onChange={this.onHandleChange}
                    />

                    <label htmlFor="duration">Duration:</label>
                    <input 
                        type="number" 
                        className="form-control form-control-sm" 
                        id="duration" min="1"
                        onChange={this.onHandleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        id="title"
                        onChange={this.onHandleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        );
    }
}

export default AddEventForm;
