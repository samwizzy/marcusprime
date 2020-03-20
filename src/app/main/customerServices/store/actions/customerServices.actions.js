import axios from 'axios';
import qs from 'query-string';
import { showMessage } from '../../../../../app/store/actions/fuse';
import firebaseService from '../../../../services/firebaseService';

export const GET_ADMINS = '[CS APP] GET ADMINS';
export const SAVE_CS = '[CS APP] SAVE CS';
export const GET_CS = '[CS APP] GET CS';
export const GET_CS_DETAILS = '[CS APP] RM DETAILS';
export const UPDATE_CS = '[CS APP] UPDATE CS';
export const DISABLE_CS = '[CS APP] DISABLE CS';
export const OPEN_NEW_CS_DIALOG = '[CS APP] OPEN NEW CS DIALOG';
export const CLOSE_NEW_CS_DIALOG = '[CS APP] CLOSE NEW CS DIALOG';
export const OPEN_EDIT_CS_DIALOG = '[CS APP] OPEN EDIT CS DIALOG';
export const CLOSE_EDIT_CS_DIALOG = '[CS APP] CLOSE EDIT CS DIALOG';

export function getAllAdmins()
{
    const request = axios.get('authserv/api/v1/admin/users');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ADMINS,
                payload: response.data
            })
        );
}

export function getAllRMs() {
    const request = axios.get('conciergeserv/api/v1/customer_care');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_CS,
                payload: response.data
            })
        );
}

export function getRmDetails(id) {

    const request = axios.get('financialserv/api/v1/products/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_CS_DETAILS,
                payload: response.data,
            })
        );
}

export function openNewRmDialog() {
    return {
        type: OPEN_NEW_CS_DIALOG
    }
}

export function closeNewRmDialog() {
    return {
        type: CLOSE_NEW_CS_DIALOG,
    }
}

export function saveRM(rm) {

    // const data = { adminId: rm.adminId, available: true}

    const request = axios.post('conciergeserv/api/v1/customer_care/add', rm);

    return (dispatch) => {

            dispatch(showMessage({message: 'Customer Services Added Successfully'})); //TODO: coming back for you

            return request.then((response) => {
                firebaseService.createCSData(rm);
                // const adUserID = `${rm.adminId}@marcus.com`;
                firebaseService.createCSAuthData(rm.email, '@abcde[ABCD01234');
                Promise.all([
                    dispatch({
                        type: SAVE_CS,
                        payload: response.data,
                    })
                ]).then(() => dispatch(getAllRMs()))
            }
        );
    }
}

export function openEditRmDialog(data) {
    return {
        type: OPEN_EDIT_CS_DIALOG,
        data
    }
}

export function closeEditRmDialog() {
    return {
        type: CLOSE_EDIT_CS_DIALOG
    }
}

export function updateRM(data) {

    const request = axios.put('financialserv/api/v1/products/tbills/updateRate', data);

    return (dispatch) =>
        request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_CS,
                    payload: response.data,
                })
            ]).then(() => dispatch(getAllRMs()))
        );
}

export function disableRM(id, available) {

    const data = { id, available };

    console.log(data, 'data');

    return (dispatch) => {

        const request = axios.put('financialserv/api/v1/enable');

        return request.then((response) => {
            Promise.all([
                dispatch({
                    type: DISABLE_CS
                })
            ]).then(() => dispatch(getAllRMs()))
        }

        );
    };
}