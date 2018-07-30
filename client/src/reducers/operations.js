import * as types from './../constants/ActionTypes';

var initState = {
    status: ''
};

const operations = (state = initState, action)=>{
    switch(action.type){
        case types.ADD_DATA:
            return {
                ...state,
                status: action.status
            }
        case types.DELETE_EVENT:
            return {
                ...state,
                status: action.status
            }
        default: return state;
    }
}

export default operations;