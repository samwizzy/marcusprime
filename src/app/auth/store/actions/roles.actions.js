import axios from 'axios';

export const GET_ROLES = '[AUTH ROLE APP] GET ROLES';

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