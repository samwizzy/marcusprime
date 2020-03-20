import axios from 'axios';

export const GET_ALL_ACTIVITY_LOGS = '[ACTIVITY LOGS APP] GET ALL ACTIVITY LOGS';

export function getAllTempProducts() {
    const request = axios.get('logserv/api/v1/activities');

    console.log(request, 'activety request')

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ALL_ACTIVITY_LOGS,
                payload: response.data
            })
        );
}
