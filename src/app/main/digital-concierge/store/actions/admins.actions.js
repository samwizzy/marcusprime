import axios from 'axios';

export const GET_ADMIN = '[ADMIN APP] GET ADMIN';
export const GET_ADMINS = '[ADMIN APP] GET ADMINS';
export const GET_ROLES = '[ADMIN APP] GET ROLES';

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

export function getAdmin(adUserID)
{
    const request = axios.get('authserv/api/v1/admin/' + adUserID);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ADMIN,
                payload: response.data
            })
        );
}

export function getRoles()
{
    const request = axios.get('authserv/api/v1/roles');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ROLES,
                payload: response.data
            })
        );
}


