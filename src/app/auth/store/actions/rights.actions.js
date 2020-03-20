import axios from 'axios';

export const GET_ROLE_RIGHTS = '[RIGHT APP] GET RIGHTS';
export const GET_ROLE_RIGHT = '[RIGHT APP] GET RIGHT';
export const GET_AUTH_ROLES = '[RIGHT APP] GET AUTH ROLES';

export function getRoleRights()
{
    const request = axios.get('authserv/api/v1/roleRights');

    return (dispatch) =>
        request.then((response) => {
                return dispatch({
                    type   : GET_ROLE_RIGHTS,
                    payload: response.data
                })
            }
        );
}

export function getRoleRight(id)
{
    const request = axios.get(`authserv/api/v1/role/${id}/getRights`);

    return (dispatch) =>
        request.then((response) => {
                return dispatch({
                    type   : GET_ROLE_RIGHT,
                    payload: response.data
                })
            }
        );
}

export function getAuthRoles(id)
{
    const request = axios.get(`authserv/api/v1/role/${id}/getRights`);

    return (dispatch) =>
        request.then((response) => {
                return dispatch({
                    type   : GET_AUTH_ROLES,
                    payload: response.data
                })
            }
        );
}