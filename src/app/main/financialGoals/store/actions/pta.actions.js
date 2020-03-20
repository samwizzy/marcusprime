import axios from 'axios';

export const GET_PTA_REQUEST = '[FINANCIAL GOALS APP] GET PTA GOALS';

export function getPtaRequests(key) {

    const request = axios.get('financialserv/api/v1/investments/get_by_productcategory_and_status?key=' + key);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PTA_REQUEST,
                payload: response.data,
            })
        );
}