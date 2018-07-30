import { combineReducers } from 'redux'; 
import time from './time';
import events from "./events";
import operations from "./operations"

const reducers = combineReducers({
    time,
    events,
    operations
})

export default reducers;