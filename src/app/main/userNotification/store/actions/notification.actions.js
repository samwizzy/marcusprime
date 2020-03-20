import axios from 'axios'
import { showMessage } from '../../../../store/actions/fuse'
import * as Actions from '.'

export const GET_EMAIL = '[NOTIFICATIONS APP] GET EMAIL NOTIFICATIONS';
export const GET_SMS = '[NOTIFICATIONS APP] GET SMS NOTIFICATIONS';
export const SAVE_SMS = '[NOTIFICATIONS APP] SAVE SMS NOTIFICATIONS';
export const SAVE_EMAIL = '[NOTIFICATIONS APP] SAVE EMAIL NOTIFICATIONS';
export const SAVE_PUSH_NOTIFICATION = '[NOTIFICATIONS APP] SAVE PUSH NOTIFICATIONS';


export function saveSMS(data) 
{
    const request = axios.post('utilityserv/api/v1/sms/send_message_to_many_recipients', data);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'SMS has been sent successfully'}));

                dispatch({
                    type: SAVE_SMS,
                    payload: response.data,
                })
        });
}

export function saveEmail(data) 
{
    const request = axios.post('utilityserv/api/v1/email/send_email', data);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'Email has been sent successfully'}));

            Promise.all([
                dispatch({
                    type: SAVE_EMAIL,
                    payload: response.data,
                })
            ])
        });
}

export function savePushNotification(data) 
{
    const request = axios.post('utilityserv/api/v1/notification/topic', data);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'Push Notification has been sent successfully'}));

            Promise.all([
                dispatch({
                    type: SAVE_PUSH_NOTIFICATION,
                    payload: response.data,
                })
            ])
        });
}

export function sendPushNotification(uuid, data) 
{
    const request = axios.post('utilityserv/api/v1/notification/uuid/' + uuid, data);

    return (dispatch) =>
        request.then((response) => {
            if(response.status === 200 && response.statusText === 'OK'){
                dispatch(showMessage({message: 'Push Notification has been sent successfully'}));

                Promise.all([
                    dispatch({
                        type: SAVE_PUSH_NOTIFICATION,
                        payload: response.data,
                    })
                ])
            }
        });
}