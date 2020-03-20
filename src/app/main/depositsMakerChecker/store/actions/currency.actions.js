import axios from 'axios'
import { showMessage } from '../../../../store/actions/fuse'
import * as Actions from '../actions'

export const GET_CURRENCIES = '[FIXED DEPOSIT APP] GET ALL CURRENCIES';

export function getCurrencies()
{
    const request = axios.get('authserv/api/v1/currencies');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CURRENCIES,
                payload: response.data
            })
        );
}