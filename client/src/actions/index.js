import axios from 'axios';
import * as types from './../constants/ActionTypes';

const API = "/api/events";

export const fetchDataSuccess = (data) => {
    return {
        type: types.FETCH_DATA_SUCCESS,
        data
    }
}
export const fetchDataFailure = (error) => {
    return {
        type: types.FETCH_DATA_FAILURE,
        error
    }
}
export const addData = (status) => {
    return {
        type: types.ADD_DATA,
        status
    }
}
export const deleteData = (status) => {
    return {
        type: types.DELETE_EVENT,
        status
    }
}

export const fetchEvents = () => {
    return dispatch => {
        return axios.get(API)
            .then(handleErrors)
            .then(res => dispatch(fetchDataSuccess(res)))
            .catch(error => {
                console.log(error)
                return dispatch(fetchDataFailure(error))
            })
    }
}

export const addEvent = (data) => {
    return dispatch => {
        return axios.post(API,data)
            .then(handleErrors)
            .then(res => {
                if(res !== 'OK'){
                    throw Error(res)
                }
                return dispatch(addData(res))
            })
            .catch(error => dispatch(addData(error)))
    }
}

export const deleteEvent = (id) => {
    return dispatch => {
        return axios.delete(`${API}/${id}`)
            .then(handleErrors)
            .then(res => {
                if(res !== 'OK'){
                    throw Error(res)
                }
                return dispatch(deleteData(res))
            })
            .catch(error => dispatch(deleteData(error)))
    }
}

function handleErrors(response) {
    if (response.status !== 200) {
        throw Error(response.statusText);
    }
    return response.data;
}