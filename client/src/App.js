import React, { Component } from 'react';
import TimeContainer from './containers/TimeContainer';
import EventContainer from './containers/EventContainer';
import AddEventContainer from './containers/AddEventContainer';

class App extends Component {
    render() {
        return (
            <div className="container">
                <AddEventContainer />
                
                <div className="row no-padding">
                    <div className="col-3">
                        <TimeContainer />
                    </div>
                    <EventContainer />
                </div>
            </div>
        );
    }
}

export default App;
