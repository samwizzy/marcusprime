import axios from 'axios';

export const GET_ADMINS = '[ADMIN APP] GET ADMINS';

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