import axios from 'axios'
import { showMessage } from '../../../../store/actions/fuse'
import * as Actions from '.'

export const GET_CUSTOMERS = '[NOTIFICATIONS APP] GET CUSTOMERS';
export const GET_USER_BY_GROUP = '[NOTIFICATIONS APP] GET USER BY GROUP NOTIFICATIONS';
export const GET_ALL_GROUP = '[NOTIFICATIONS APP] GET ALL GROUP NOTIFICATIONS';

export function getCustomers() {
    const request = axios.get('authserv/api/v1/users');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_CUSTOMERS,
                payload: response.data,
            })
        );
}

export function getUserByGroup(id) 
{
    const request = axios.get('authserv/api/v1/users/find_by_risk_level/' + id);

    return (dispatch) =>
        request.then((response) => {
                dispatch({
                    type: GET_USER_BY_GROUP,
                    payload: response.data,
                })
        });
}

export function getAllGroup() 
{
    const request = axios.get('authserv/api/v1/users');

    return (dispatch) =>
        request.then((response) => {
                dispatch({
                    type: GET_ALL_GROUP,
                    payload: response.data,
                })
        });
}