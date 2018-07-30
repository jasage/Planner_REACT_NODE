import * as types from './../constants/ActionTypes';

var initState = {
    data: [],
    error: null
};

const events = (state = initState, action)=>{
    switch(action.type){
        case types.FETCH_DATA_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case types.FETCH_DATA_FAILURE:
            return {
                ...state,
                error: action.error
            }
        default: return state;
    }
}

export default events;