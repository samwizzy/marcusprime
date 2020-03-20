import axios from 'axios';

export const GET_DEPARTMENTS = '[DEPARTMENT APP] GET DEPARTMENTS';

export function getDepartments()
{
    const request = axios.get('conciergeserv/api/v1/departments');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DEPARTMENTS,
                payload: response.data
            })
        );
}