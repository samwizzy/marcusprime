import axios from 'axios';
import {showMessage} from '../../../../../app/store/actions/fuse';
import * as Actions from './';

export const GET_ADMINS = '[ADMIN APP] GET ADMINS';
export const GET_ADMIN = '[ADMIN APP] GET ADMIN';
export const UPDATE_ADMIN = '[ADMIN APP] UPDATE ADMIN';
export const DELETE_ADMIN = '[ADMIN APP] DELETE ADMIN';
export const GET_MAIL = '[MAIL APP] GET MAIL';
export const UPDATE_MAIL = '[MAIL APP] UPDATE MAIL';
export const TOGGLE_STAR = '[MAIL APP] TOGGLE STAR MAIL';
export const TOGGLE_IMPORTANT = '[MAIL APP] TOGGLE IMPORTANT MAIL';
export const OPEN_COMPOSE_DIALOG = '[ADMIN APP] OPEN COMPOSE DIALOG';
export const CLOSE_COMPOSE_DIALOG = '[ADMIN APP] CLOSE COMPOSE DIALOG';
export const SELECT_ALL_ADMINS = '[ADMIN APP] SELECT ALL ADMINS';
export const DESELECT_ALL_ADMINS = '[ADMIN APP] DESELECT ALL ADMINS';
export const TOGGLE_IN_SELECTED_ADMINS = '[ADMIN APP] TOGGLE IN SELECTED ADMINS';
export const SELECT_ADMINS_BY_PARAMETER = '[ADMIN APP] SELECT ADMINS BY PARAMETER';

export function getAdmins()
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

export function getAdmin(routeParams)
{
    const request = axios.get('authserv/api/v1/admin/' + routeParams);

    return (dispatch) =>
        request.then((response) => {
            console.log(response.data, "Response Data");
            dispatch({
                type       : GET_ADMIN,
                payload    : response.data
            })
        });
}

export function updateAdmin(data)
{
    const request = axios.put('authserv/api/v1/admin/update', data);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'Admin Updated Successfully'}));

            Promise.all([
                dispatch({
                    type   : UPDATE_ADMIN,
                    payload: response.data
                })
            ]).then(() => dispatch(Actions.getAdmins()))
        });
}

export function deleteAdmin(id)
{
    const request = axios.delete('authserv/api/v1/admin/' + id);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'Admin Deleted Successfully'}));

            Promise.all([
                dispatch({
                    type   : DELETE_ADMIN,
                    payload: response.data
                })
            ]).then(() => dispatch(Actions.getAdmins()))
        });
}

export function selectAllAdmins()
{
    return {
        type: SELECT_ALL_ADMINS
    }
}

export function deselectAllAdmins()
{
    return {
        type: DESELECT_ALL_ADMINS
    }
}

export function openComposeDialog()
{
    return {
        type: OPEN_COMPOSE_DIALOG,
        payload: true
    }
}

export function closeComposeDialog()
{
    return {
        type: CLOSE_COMPOSE_DIALOG,
        payload: false
    }
}

export function toggleInSelectedAdmins(adUserID)
{
    return {
        type: TOGGLE_IN_SELECTED_ADMINS,
        adUserID
    }
}

export function selectAdminsByParameter(parameter)
{
    return {
        type   : SELECT_ADMINS_BY_PARAMETER,
        payload: parameter
    }
}

export function toggleStar(mail)
{
    const newMail = {
        ...mail,
        starred: !mail.starred
    };
    return (dispatch) => {
        dispatch({type: TOGGLE_STAR});
        return dispatch(updateMail(newMail));
    }
}

export function toggleImportant(mail)
{
    const newMail = {
        ...mail,
        important: !mail.important
    };

    return (dispatch) => {
        dispatch({type: TOGGLE_IMPORTANT});
        return dispatch(updateMail(newMail));
    }
}


export function updateMail(mail)
{
    const request = axios.post('/api/roles-app/update-roles', mail);

    return (dispatch) =>
        request.then((response) => {
                return dispatch({
                    type   : UPDATE_MAIL,
                    payload: response.data
                })
            }
        );
}
