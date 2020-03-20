import axios from 'axios';
import { showMessage } from '../../../../../app/store/actions/fuse';
import * as Actions from './'

export const GET_PTA_REQUEST = '[FINANCIAL GOALS APP] GET PTA GOALS';
export const GET_RATE = '[FINANCIAL GOALS APP] GET RATE';
export const UPDATE_RATE = '[FINANCIAL GOALS APP] UPDATE RATE';
export const DISABLE_RATE = '[FINANCIAL GOALS APP] DISABLE RATE';
export const OPEN_NEW_RATE_DIALOG = '[FINANCIAL GOALS APP] OPEN NEW RATE DIALOG';
export const CLOSE_NEW_RATE_DIALOG = '[FINANCIAL GOALS APP] CLOSE NEW RATE DIALOG';
export const OPEN_EDIT_RATE_DIALOG = '[FINANCIAL GOALS APP] OPEN EDIT RATE DIALOG';
export const CLOSE_EDIT_RATE_DIALOG = '[FINANCIAL GOALS APP] CLOSE EDIT RATE DIALOG';

export function getCurrencies() {

    const request = axios.get('authserv/api/v1/currencies');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_RATE,
                payload: response.data,
            })
        );
}

export function openNewRateDialog() {
    return {
        type: OPEN_NEW_RATE_DIALOG
    }
}

export function closeNewRateDialog() {
    return {
        type: CLOSE_NEW_RATE_DIALOG
    }
}

export function addRate(data) {

    console.log(data, 'exchange data')

    const request = axios.post('authserv/api/v1/currencies/add', data);

    console.log(request, 'exchange request')

    return (dispatch) => {

        dispatch(showMessage({ message: 'Currency Added Succefully' }));

        request.then((response) =>
            Promise.all([
                dispatch({
                    type: GET_PTA_REQUEST,
                    payload: response.data,
                })
            ]).then(() => dispatch(Actions.getCurrencies()))
        );
    }
}

export function openEditRateDialog(data) {
    console.log(data, 'get by 1 data');
    return {
        type: OPEN_EDIT_RATE_DIALOG,
        data
    }
}

export function closeEditRateDialog() {
    return {
        type: CLOSE_EDIT_RATE_DIALOG
    }
}

export function updateRate(data) {
    
    const request = axios.put('authserv/api/v1/currencies/update', data);
    console.log(request, "request action chukwubunna")

    return (dispatch) =>
        request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_RATE,
                    payload: response.data,
                })
            ]).then(() => dispatch(Actions.getCurrencies()))
        );
}
