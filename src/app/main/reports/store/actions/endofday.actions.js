import axios from 'axios'
import moment from 'moment'

export const GET_END_OF_DAYS = '[REPORTS APP] GET END OF DAYS';
export const GET_END_OF_DAYS_BY_DATE = '[REPORTS APP] GET END OF DAYS BY DATE';
export const GET_END_OF_DAYS_BY_DATE_LOADING = '[REPORTS APP] GET END OF DAYS BY DATE LOADING';
export const GET_END_OF_DAY = '[REPORTS APP] GET END OF DAY';
export const GET_END_OF_DAY_BY_CURRENCY = '[REPORTS APP] GET END OF DAY BY CURRENCY';
export const GET_END_OF_DAY_CREATED_DATE = '[REPORTS APP] GET END OF DAY CREATED DATE';
export const GET_END_OF_DAY_CREATED_DATE_AND_CURRENCY = '[REPORTS APP] GET END OF DAY CREATED DATE AND CURRENCY';

export function getEndOfDays(params = {limit: 10, start: 0})
{
    const {limit, start} = params
    const request = axios.get(`logserv/api/end_of_day/reports?limit=${limit}&start=${start}`);

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_END_OF_DAYS,
                    payload: response.data
                })
            }
        })
}

export function getEndOfDaysByCurrencyAndDataCreated(params = {createdDate: '', currency: 'NGN', limit: 10, start: 0})
{
    const request = axios.get('logserv/api/end_of_day/reports/by_created_date_and_currency', { params });

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200 && response.statusText === 'OK'){
                dispatch({
                    type   : GET_END_OF_DAY_CREATED_DATE_AND_CURRENCY,
                    payload: response.data
                })
            }
        })
}

export function getEndOfDaysByCurrency(params = {currency: 'NGN', limit: 10, start: 0})
{
    const request = axios.get('logserv/api/end_of_day/reports/by_currency', { params });

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200 && response.statusText === 'OK'){
                dispatch({
                    type   : GET_END_OF_DAY_BY_CURRENCY,
                    payload: response.data
                })
            }
        })
}

export function getEndOfDaysByCreatedDate(params = {createdDate: '', limit: 10, start: 0})
{
    const request = axios.get('/api/end_of_day/reports/by_created_date', { params });

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_END_OF_DAY_CREATED_DATE,
                    payload: response.data
                })
            }
        })
}

export function getEndofDaysByDate(currentEndofdays, date) {

    return (dispatch, getState) => {
        dispatch({type: GET_END_OF_DAYS_BY_DATE_LOADING})

        const {data} = getState().endOfDayApp.endofday;
        const { payload } = data
        const startDate = moment(date.startDate).subtract(1, "days")
        const endDate = moment(date.endDate).add(1, "days")
        const endofdaysLog = payload && payload.filter(d => moment(d.createdAt).isBetween(startDate, endDate))

        console.log(endofdaysLog, "selectedData endofdaysLog")

        dispatch({
            type: GET_END_OF_DAYS_BY_DATE,
            payload: {
                ...data,
                payload: endofdaysLog
            },
        })
    }    
}
