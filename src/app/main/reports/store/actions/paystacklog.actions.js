import axios from 'axios'
import moment from 'moment'

export const GET_PAYSTACK_LOGS = '[REPORTS APP] GET PAYSTACK LOGS';
export const GET_PAYSTACK_LOGS_BY_DATE = '[REPORTS APP] GET PAYSTACK LOGS';

export function getPaystackLogs(params)
{
    const request = axios.get('logserv/api/v1/paystack_refs', { params });

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_PAYSTACK_LOGS,
                    payload: response.data
                })
            }
        })
}

export function getPaystackLogByDate(currrentPaystacks, date) {

    return (dispatch, getState) => {
        const {data} = getState().paystackLogApp.paystacklog;
        const { payload } = data
        const startDate = moment(date.startDate).subtract(1, "days")
        const endDate = moment(date.endDate).add(1, "days")
        const filteredPayload = payload && payload.filter(d => moment(d.createdAt).isBetween(startDate, endDate))

        console.log(filteredPayload, "selectedData endofdaysLog")

        dispatch({
            type: GET_PAYSTACK_LOGS_BY_DATE,
            payload: {
                ...data,
                payload: filteredPayload
            },
        })
    }    
}
