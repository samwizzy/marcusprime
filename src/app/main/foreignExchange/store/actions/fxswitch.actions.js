import axios from 'axios'
import { showMessage } from '../../../../store/actions/fuse'
import * as Actions from './'
import _ from 'lodash'

export const GET_FX_RATES = '[FX SWITCH APP] GET FX RATES';
export const GET_FX_RATE = '[FX SWITCH APP] GET FX RATE';
export const GET_FX_RATE_BY_TYPE = '[FX SWITCH APP] GET FX RATE BY TYPE';
export const SAVE_FX_RATE = '[FX SWITCH APP] SAVE FX RATE';
export const UPDATE_FX_RATE = '[FX SWITCH APP] UPDATE FX RATE';
export const OPEN_NEW_FX_RATE_DIALOG = '[FX SWITCH APP] OPEN NEW FX RATE DIALOG';
export const CLOSE_NEW_FX_RATE_DIALOG = '[FX SWITCH APP] CLOSE FX RATE DIALOG';
export const OPEN_EDIT_FX_RATE_DIALOG = '[FX SWITCH APP] OPEN EDIT FX RATE DIALOG';
export const CLOSE_EDIT_FX_RATE_DIALOG = '[FX SWITCH APP] CLOSE EDIT FX RATE DIALOG';

export function getFxRates()
{
    const request = axios.get('financialserv/api/v1/rates');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FX_RATES,
                payload: response.data
            })
        );
}

export function getFxRate(id)
{
    const request = axios.get('financialserv/api/v1/rates/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FX_RATE,
                payload: response.data
            })
        );
}

export function getRateByType(params)
{
    const request = axios.get('financialserv/api/v1/rates/find_by_type', { params });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FX_RATE_BY_TYPE,
                payload: response.data
            })
        );
}

export function openNewFxSwitchDialog() {

    const data = {
        id: '',
        currencyPair: '',
        bid: '',
        offer: '',
        type: '',
        marginPoint: ''
    }
    
    return {
        type: OPEN_NEW_FX_RATE_DIALOG,
        mode: 'new',
        status: true,
        payload: data
    }
}

export function closeNewFxSwitchDialog() {
    return {
        type: CLOSE_NEW_FX_RATE_DIALOG,
        status: false
    }
}

export function addFxSwitch(data) 
{
    const request = axios.post('financialserv/api/v1/rates/add', data);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'FX Rate has been added successfully'}));

            Promise.all([
                dispatch({
                    type: SAVE_FX_RATE,
                    payload: response.data,
                })
            ]).then(() => dispatch(Actions.getFxRates()))
        });
}

export function updateFxSwitch(data) {
    
    console.log(data, "Form data form")
    const request = axios.put('financialserv/api/v1/rate/update', data);
    
    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'FX Rate has been updated successfully'}));

            Promise.all([
                dispatch({
                    type: UPDATE_FX_RATE
                })
            ]).then(() => dispatch(Actions.getRateByType({type: data.type})))
        });
}

export function openEditFxSwitchDialog(id) {
    const request = axios.get('financialserv/api/v1/rates/' + id);

    return (dispatch) =>
        request.then((response) => {
            var data = _(response.data).omitBy(_.isUndefined).value();
            console.log(data, "Switch Dialog Data");
            dispatch({
                type: OPEN_EDIT_FX_RATE_DIALOG,
                mode: "edit",
                status: true,
                payload: data
            })
        });
}

export function closeEditFxSwitchDialog() {
    return (dispatch) =>
        dispatch({
            type: CLOSE_EDIT_FX_RATE_DIALOG,
            status: false,
        })
}