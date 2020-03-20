import axios from 'axios';
import moment from 'moment'

export const GET_FX_SALES = '[FX APP] GET FX SALES';
export const GET_FX_SWITCH = '[FX APP] GET FX SWITCH';
export const UPDATE_FILTERING = '[FX APP] UPDATE FILTERING';
export const GET_FX_SWITCH_BY_DATE = '[FX APP] GET FX SWITCH BY DATE';
export const GET_FX_SALES_BY_DATE = '[FX APP] GET FX SALES BY DATE';

export function getFxSales() {
    const request = axios.get('financialserv/api/v1/fxsales');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_FX_SALES,
                payload: response.data,
            })
        );
}

export function getFxSwitch() {
    const request = axios.get('financialserv/api/v1/switch/get_all');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_FX_SWITCH,
                payload: response.data,
            })
        );
}

export function handleTabChange() {
    return {
        type: UPDATE_FILTERING,
        payload: {
            status: false
        },
    }
}


export function getFxSwitchByDate(currentfxSwitches, date) {

    return (dispatch, getState) => {
        const {fxswitch} = getState().fxswitchApp.fx;
        const startDate = moment(date.startDate).subtract(1, "days")
        const endDate = moment(date.endDate).add(1, "days")
        const fxswitchLog = fxswitch && fxswitch.filter(d => moment(d.valueDate).isBetween(startDate, endDate))

        console.log(fxswitchLog, "selectedData fxswitchLog")

        dispatch({
            type: GET_FX_SWITCH_BY_DATE,
            payload: fxswitchLog,
        })
    }    
}

export function getFxSalesByDate(currentFxsales, date) {

    return (dispatch, getState) => {
        const {getFxSales} = getState().fxsalesApp.fx;
        const startDate = moment(date.startDate).subtract(1, "days")
        const endDate = moment(date.endDate).add(1, "days")
        const getFxSalesLog = getFxSales && getFxSales.filter(d => moment(d.valueDate).isBetween(startDate, endDate))

        console.log(getFxSalesLog, "selectedData getFxSalesLog")

        dispatch({
            type: GET_FX_SALES_BY_DATE,
            payload: getFxSalesLog,
        })
    }    
}