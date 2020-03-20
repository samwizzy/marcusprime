import axios from 'axios'
import { showMessage } from '../../../../store/actions/fuse'
import * as Actions from '.'

export const GET_SETTINGS = '[SETTINGS APP] GET SETTING';
export const GET_SETTING = '[SETTINGS APP] GET SETTING';
export const SAVE_SETTING = '[SETTINGS APP] SAVE SETTING';
export const UPDATE_SETTING = '[SETTINGS APP] UPDATE SETTING';
export const OPEN_NEW_SETTING_DIALOG = '[SETTINGS APP] OPEN NEW SETTING DIALOG';
export const CLOSE_NEW_SETTING_DIALOG = '[SETTINGS APP] CLOSE NEW SETTING DIALOG';
export const OPEN_EDIT_SETTING_DIALOG = '[SETTINGS APP] OPEN EDIT SETTING DIALOG';
export const CLOSE_EDIT_SETTING_DIALOG = '[SETTINGS APP] CLOSE EDIT SETTING DIALOG';

export function getSettings()
{
    const request = axios.get('utilityserv/api/v1/settings/all');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SETTINGS,
                payload: response.data
            })
        );
}

export function getSetting(id)
{
    const request = axios.get('utilityserv/api/v1/settings/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SETTING,
                payload: response.data
            })
        );
}

export function openNewSettingDialog() {

    const data = {
        loanNotificationDepts: [],
        ptaNotificationDepts: []
    }
    
    return {
        type: OPEN_NEW_SETTING_DIALOG,
        mode: 'new',
        status: true,
        payload: data
    }
}

export function closeNewSettingDialog() {
    return {
        type: CLOSE_NEW_SETTING_DIALOG,
        status: false
    }
}

export function addSetting(data) 
{
    const request = axios.post('utilityserv/api/v1/settings/add', data);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'Setting has been added successfully'}));

            Promise.all([
                dispatch({
                    type: SAVE_SETTING,
                    payload: response.data,
                })
            ]).then(() => dispatch(Actions.getSettings()))
        });
}

export function updateSetting(data) {
    
    const request = axios.put('utilityserv/api/v1/settings/update', data);
    
    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'Settings has been updated successfully'}));

            Promise.all([
                dispatch({
                    type: UPDATE_SETTING
                })
            ]).then(() => dispatch(Actions.getSettings()))
        });
}

export function openEditSettingDialog(id) {
    const request = axios.get('utilityserv/api/v1/settings/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: OPEN_EDIT_SETTING_DIALOG,
                mode: "edit",
                status: true,
                payload: response.data
            })
        );
}

export function closeEditSettingDialog() {
    return (dispatch) =>
        dispatch({
            type: CLOSE_EDIT_SETTING_DIALOG,
            status: false,
        })
}