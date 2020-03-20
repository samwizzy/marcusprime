import axios from 'axios';
import qs from 'qs';
import { showMessage } from '../../../../store/actions/fuse';
import moment from 'moment' 

export const GET_GL_TRANSFER_LOGS = '[TRANSFER QUEUE APP] GET GL TRANSFER LOG';
export const GET_GL_TRANSFER_LOG = '[TRANSFER QUEUE APP] GET GL TRANSFER LOG';
export const GET_GL_TRANSFER_LOG_BY_DATE = '[TRANSFER QUEUE APP] GET GL TRANSFER LOG BY DATE';
export const SEND_GL_TRANSFER_LOG = '[TRANSFER QUEUE APP] SEND GL TRANSFER LOG';
export const DELETE_GL_TRANSFER_LOG = '[TRANSFER QUEUE APP] DELETE GL TRANSFER LOG';
export const OPEN_NEW_TRANSFER_LOG_DIALOG = '[TRANSFER QUEUE APP] OPEN NEW GL TRANSFER LOG DIALOG';
export const CLOSE_NEW_TRANSFER_LOG_DIALOG = '[TRANSFER QUEUE APP] CLOSE NEW GL TRANSFER LOG DIALOG';


export function getAllTransferLog() {
    const request = axios.get('logserv/api/v1/gl_logs');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_GL_TRANSFER_LOGS,
                payload: response.data
            })
        );
}

export function getTransferLog(id) {
    const request = axios.get('logserv/api/v1/gl_logs/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_GL_TRANSFER_LOG,
                payload: response.data
            })
        );
}

export function getTransferLogByDate(logs, date) {
    const startDate = moment(date.startDate).subtract(1, "days")
    const endDate = moment(date.endDate).add(1, "days")
    const transferLogs = logs && logs.filter(d => moment(d.valueDate).isBetween(startDate, endDate))

    console.log(transferLogs, "selectedData")

    return (dispatch) =>
        dispatch({
            type: GET_GL_TRANSFER_LOG_BY_DATE,
            payload: transferLogs,
        })
}

export function openTransferDialog(data) {
    return {
        type: OPEN_NEW_TRANSFER_LOG_DIALOG,
        payload: data,
    }
}

export function closeTransferDialog() {
    return {
        type: CLOSE_NEW_TRANSFER_LOG_DIALOG
    }
}

export function approveTransfer(data) {

    const request = axios.post('financialserv/api/v1/do_transfer/' + data.id);

    console.log(request, 'request')

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({ message: response.data.message }));

            Promise.all([
                dispatch({
                    type: SEND_GL_TRANSFER_LOG,
                    payload: response.data,
                })
            ]).then(() => dispatch(getAllTransferLog()))
        }
        );
}