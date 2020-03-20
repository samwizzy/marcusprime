import axios from 'axios'
import { showMessage } from '../../../../store/actions/fuse'
import qs from 'qs'
import * as Actions from '../actions'

export const GET_DEPOSIT_RATES = '[FIXED DEPOSIT APP] GET FIXED DEPOSITS RATES';
export const GET_DEPOSIT_RATE = '[FIXED DEPOSIT APP] GET FIXED DEPOSITS RATE';
export const SAVE_DEPOSIT_RATE = '[FIXED DEPOSIT APP] SAVE FIXED DEPOSIT RATE';
export const UPDATE_DEPOSIT_RATE = '[FIXED DEPOSIT APP] UPDATE FIXED DEPOSIT RATE';
export const APPROVE_FIXED_DEPOSIT = '[FIXED DEPOSIT APP] APPROVE FIXED DEPOSIT RATE';
export const OPEN_NEW_DEPOSIT_DIALOG = '[FIXED DEPOSIT APP] OPEN NEW FIXED DEPOSIT DIALOG';
export const CLOSE_NEW_DEPOSIT_DIALOG = '[FIXED DEPOSIT APP] CLOSE NEW DEPOSIT DIALOG';
export const OPEN_EDIT_DEPOSIT_DIALOG = '[FIXED DEPOSIT APP] OPEN EDIT FIXED DEPOSIT DIALOG';
export const CLOSE_EDIT_DEPOSIT_DIALOG = '[FIXED DEPOSIT APP] CLOSE EDIT FIXED DEPOSIT DIALOG';

export function getDepositRates()
{
    // const request = axios.get('financialserv/api/v1/td_rate_tenor_guides');
    const request = axios.get('financialserv/api/v1/temp_td_rates');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DEPOSIT_RATES,
                payload: response.data
            })
        );
}

export function getDepositRate(id)
{
    const request = axios.get('financialserv/api/v1/td_rate_tenor_guides/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DEPOSIT_RATE,
                payload: response.data
            })
        );
}

export function openNewDepositDialog() {

    const data = {
        id: '',
        minAmount: '',
        maxAmount: '',
        rate: '',
        tenorSeperatedBySlash: ''
    }
    
    return {
        type: OPEN_NEW_DEPOSIT_DIALOG,
        mode: 'new',
        status: true,
        payload: data
    }
}

export function closeNewDepositDialog() {
    return {
        type: CLOSE_NEW_DEPOSIT_DIALOG,
        status: false
    }
}

export function addDepositRate(data) 
{
    // const request = axios.post('financialserv/api/v1/td_rate_tenor_guide/add', data);
    const request = axios.post('financialserv/api/v1/temp_td_rates/add', data);

    return (dispatch) =>
        request.then((response) => {
            if(response.data && response.data.success === false && response.data.code === '000'){
                // dispatch(showMessage({message: response.data.message}));
                dispatch(showMessage({message: 'Deposit Rate has been added successfully'}));

                Promise.all([
                    dispatch({
                        type: SAVE_DEPOSIT_RATE,
                        payload: response.data,
                    })
                ]).then(() => dispatch(Actions.getDepositRates()))
            }else{
                dispatch(showMessage({message: response.data.message}));
            }
        });
}

export function updateFixedDepositRate(data) {
    
    const request = axios.put('financialserv/api/v1/td_rate_tenor_guide/update', data);
    
    return (dispatch) =>
        request.then((response) => {
            console.log(response.data, "response.data")
            if(response.data && response.data.code == '000'){
                dispatch(showMessage({message: response.data.message}));
                
                Promise.all([
                    dispatch({
                        type: UPDATE_DEPOSIT_RATE
                    })
                ]).then(() => dispatch(Actions.getDepositRates()))
            }else{
                dispatch(showMessage({message: response.data.message}));   
            }
        });
}

export function openEditDepositDialog(id) {
    const request = axios.get('financialserv/api/v1/td_rate_tenor_guides/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: OPEN_EDIT_DEPOSIT_DIALOG,
                mode: "edit",
                status: true,
                payload: response.data
            })
        );
}

export function approveFixedDeposit(params) {
    const request = axios.post('financialserv/api/v1/temp_td_rate/approve', qs.stringify(params));

    return (dispatch) =>
        request.then((response) =>
            Promise.all([
                dispatch({
                    type: APPROVE_FIXED_DEPOSIT,
                    payload: response.data
                })
            ]).then(() => dispatch(Actions.getDepositRates()))
        );
}

export function closeEditDepositDialog() {
    return (dispatch) =>
        dispatch({
            type: CLOSE_EDIT_DEPOSIT_DIALOG,
            status: false,
        })
}