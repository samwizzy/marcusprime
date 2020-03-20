import axios from 'axios';
import {FuseUtils} from '../../../../../@fuse';
import {showMessage} from '../../../../store/actions/fuse';
import * as Actions from '.'

export const GET_ACCOUNTS         = '[WALLET FUND APP] GET_ACCOUNTS';
export const GET_ACCOUNT          = '[WALLET FUND APP] GET_ACCOUNT';
export const GET_USER_PROFILE          = '[WALLET FUND APP] GET USER PROFILE';
export const OPEN_COMPOSE_DIALOG  = '[WALLET FUND APP] OPEN COMPOSE DIALOG DOCTYPE';
export const OPEN_UPDATE_COMPOSE_DIALOG  = '[WALLET FUND APP] OPEN UPDATE COMPOSE DIALOG DOCTYPE';
export const CLOSE_COMPOSE_DIALOG = '[WALLET FUND APP] CLOSE COMPOSE DIALOG DOCTYPE';

export function getUsers() {
    const request = axios.get('authserv/api/v1/users');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ACCOUNTS,
                payload: response.data,
            })
        );
}

export function getUserProfile(data) {
    const request = axios.get('authserv/api/v1/users/' + data);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_USER_PROFILE,
                payload: response.data,
            })
        );
}

export function getUserProfileByUuid(uuid) {
    const request = axios.get('authserv/api/v1/users/get_by_uuid/' + uuid);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ACCOUNT,
                payload: response.data,
            })
        );
}
