import axios from 'axios';
import { showMessage } from '../../../../../app/store/actions/fuse';
import * as Actions from './';
import qs from 'qs';
import firebaseService from '../../../../services/firebaseService';

export const GET_ADMINS = '[ADMINS APP] GET ADMINS';
export const UPDATE_ADMIN = '[ADMINS APP] UPDATE ADMINS';
export const UPDATE_ADMIN_STATUS = '[ADMINS APP] UPDATE ADMINS STATUS';
export const DELETE_ADMIN = '[ADMINS APP] DELETE ADMINS';
export const GET_ADMIN = '[ADMINS APP] GET ADMIN';
export const GET_ADMIN_BY_EMAIL = '[ADMINS APP] GET ADMIN BY EMAIL';
export const SAVE_ADMIN = '[ADMINS APP] SAVE ADMIN';

export function getAdmin(params) {
    const request = axios.get('authserv/api/v1/admin/' + params);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ADMIN,
                payload: response.data
            })
        );
}

export function getAdminByEmail(params) {
    const request = axios.get('authserv/api/v1/admin/get_ad_profile', { params });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ADMIN_BY_EMAIL,
                payload: response.data
            })
        );
}

export function updateAdmin(params) {
    const request = axios.put('authserv/api/v1/admin/update', params);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({ message: 'Admin Updated Successfully' }));

            Promise.all([
                dispatch({
                    type: UPDATE_ADMIN,
                    payload: response.data
                })
            ]).then(() => dispatch(Actions.getAdmins()))
        });
}

export function updateAdminStatus(params) {
    const request = axios.post('authserv/api/v1/admin/enable', qs.stringify(params));

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({ message: 'Admin Status Updated Successfully' }));

            Promise.all([
                dispatch({
                    type: UPDATE_ADMIN_STATUS,
                    payload: response.data
                })
            ]).then(() => dispatch(Actions.getAdmins()))
        });
}

export function deleteAdmin(id) {
    const request = axios.delete('authserv/api/v1/admin/' + id);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({ message: 'Admin Deleted' }));

            Promise.all([
                dispatch({
                    type: DELETE_ADMIN,
                    payload: response.data
                })
            ]).then(() => dispatch(Actions.getAdmins()))
        });
}

export function getOrder(params) {
    const request = axios.get('/api/e-commerce-app/order', { params });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ADMIN,
                payload: response.data
            })
        );
}

export function saveAdmin(data) {
    const request = axios.post('authserv/api/v1/admin/add', data);

    console.log(data, 'admin data');
    return (dispatch) =>
        request.then((response) => {
            if (response.status === 200) {
                dispatch(showMessage({ message: 'Admin Saved' }));
                return dispatch({
                    type: SAVE_ADMIN,
                    payload: response.data
                })
            } else {
                dispatch(showMessage({ message: 'Failed To Admin Saved' }));
            }
        });
}
