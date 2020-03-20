import axios from 'axios';
import qs from 'query-string';
import { showMessage } from '../../../../../app/store/actions/fuse';
import firebaseService from '../../../../services/firebaseService';

export const GET_ADMINS = '[RM APP] GET ADMINS';
export const SAVE_RM = '[RM APP] SAVE RM';
export const GET_RMS = '[RM APP] GET RM';
export const GET_RM_DETAILS = '[RM APP] RM DETAILS';
export const UPDATE_RM = '[RM APP] UPDATE RM';
export const DISABLE_RM = '[RM APP] DISABLE RM';
export const OPEN_NEW_RM_DIALOG = '[RM APP] OPEN NEW RM DIALOG';
export const CLOSE_NEW_RM_DIALOG = '[RM APP] CLOSE NEW RM DIALOG';
export const OPEN_EDIT_RM_DIALOG = '[RM APP] OPEN EDIT RM DIALOG';
export const CLOSE_EDIT_RM_DIALOG = '[RM APP] CLOSE EDIT RM DIALOG';

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
    const request = axios.get('conciergeserv/api/v1/relationship_mngrs');

    console.log(request, 'request rm')

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_RMS,
                payload: response.data
            })
        );
}

export function getRmDetails(id) {

    const request = axios.get('financialserv/api/v1/products/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_RM_DETAILS,
                payload: response.data,
            })
        );
}

export function openNewRmDialog() {
    return {
        type: OPEN_NEW_RM_DIALOG
    }
}

export function closeNewRmDialog() {
    return {
        type: CLOSE_NEW_RM_DIALOG,
    }
}

export function saveRM(rm) {
    const request = axios.post('conciergeserv/api/v1/relationship_mngrs/add', rm);

    return (dispatch) => {

            return request.then((response) => {

                if (response.status === 200) {
                    dispatch(showMessage({message: 'RM Added Successfully'}));
                } else {
                    dispatch(showMessage({message: 'RM Failed To Save'}));
                }

                firebaseService.createRMData(rm);
                // const adUserID = `${rm.rmId}@marcus.com`;
                firebaseService.createRMAuthData(rm.email, '@abcde[ABCD01234');
                Promise.all([
                    dispatch({
                        type: SAVE_RM,
                        payload: response.data,
                    })
                ]).then(() => dispatch(getAllRMs()))
            }
        );
    }
}

export function openEditRmDialog(data) {
    return {
        type: OPEN_EDIT_RM_DIALOG,
        data
    }
}

export function closeEditRmDialog() {
    return {
        type: CLOSE_EDIT_RM_DIALOG
    }
}

export function updateRM(data) {

    const request = axios.put('financialserv/api/v1/products/tbills/updateRate', data);

    return (dispatch) =>
        request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_RM,
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
                    type: DISABLE_RM
                })
            ]).then(() => dispatch(getAllRMs()))
        }

        );
    };
}