import axios from 'axios'
import { showMessage } from '../../../../../app/store/actions/fuse'
import * as Actions from './'

export const GET_HOLIDAYS = '[HOLIDAY APP] GET ADMINS';
export const GET_HOLIDAY = '[HOLIDAY APP] GET HOLIDAY';
export const SAVE_HOLIDAY = '[HOLIDAY APP] SAVE HOLIDAY';
export const UPDATE_HOLIDAY = '[HOLIDAY APP] UPDATE HOLIDAY';
export const DISABLE_HOLIDAY = '[HOLIDAY APP] DISABLE HOLIDAY';
export const ENABLE_HOLIDAY = '[HOLIDAY APP] ENABLE HOLIDAY';
export const OPEN_NEW_HOLIDAY_DIALOG = '[HOLIDAY APP] OPEN NEW HOLIDAY DIALOG';
export const CLOSE_NEW_HOLIDAY_DIALOG = '[HOLIDAY APP] CLOSE NEW HOLIDAY DIALOG';
export const OPEN_EDIT_HOLIDAY_DIALOG = '[HOLIDAY APP] OPEN EDIT HOLIDAY DIALOG';
export const CLOSE_EDIT_HOLIDAY_DIALOG = '[HOLIDAY APP] CLOSE EDIT HOLIDAY DIALOG';

export function getPublicHolidays()
{
    const request = axios.get('financialserv/api/v1/publicHolidays');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_HOLIDAYS,
                payload: response.data
            })
        );
}

export function getPublicHoliday(id)
{
    const request = axios.get('financialserv/api/v1/publicHoliday/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_HOLIDAY,
                payload: response.data
            })
        );
}

export function openNewHolidayDialog() {

    const data = {
        id: '',
        name: '',
        day: ''
    }
    
    return {
        type: OPEN_NEW_HOLIDAY_DIALOG,
        mode: 'new',
        status: true,
        payload: data
    }
}

export function closeNewHolidayDialog() {
    return {
        type: CLOSE_NEW_HOLIDAY_DIALOG,
        status: false
    }
}

export function addPublicHoliday(data) 
{
    const request = axios.post('financialserv/api/v1/publicHolidays/add', data);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'Public Holiday has been added successfully'}));

            Promise.all([
                dispatch({
                    type: SAVE_HOLIDAY,
                    payload: response.data,
                })
            ]).then(() => dispatch(Actions.getPublicHolidays()))
        });
}

export function updatePublicHoliday(data) {
    
    const request = axios.put('financialserv/api/v1/publicHoliday/update', data);
    
    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'Public Holiday has been updated successfully'}));

            Promise.all([
                dispatch({
                    type: UPDATE_HOLIDAY
                })
            ]).then(() => dispatch(Actions.getPublicHolidays()))
        });
}

export function openEditHolidayDialog(id) {
    const request = axios.get('financialserv/api/v1/publicHoliday/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: OPEN_EDIT_HOLIDAY_DIALOG,
                mode: "edit",
                status: true,
                payload: response.data
            })
        );
}

export function closeEditHolidayDialog() {
    return (dispatch) =>
        dispatch({
            type: CLOSE_EDIT_HOLIDAY_DIALOG,
            status: false,
        })
}

export function disablePublicHoliday(status) 
{
    return (dispatch) => {
        const request = axios.put('financialserv/api/v1/publicHoliday', {
            param: {
                status
            }
        });

        return request.then((response) => {
            Promise.all([
                dispatch({
                    type: DISABLE_HOLIDAY
                })
            ]).then(() => dispatch(Actions.getPublicHolidays()))
        }

        );
    };
}