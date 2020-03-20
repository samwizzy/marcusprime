import axios from 'axios';
import {FuseUtils} from '../../../../../@fuse';
import {showMessage} from '../../../../../app/store/actions/fuse';
import * as Actions from './'

export const GET_DOCTYPE          = '[DOCTYPES APP] GET DOCTYPE';
export const GET_DOCTYPES         = '[DOCTYPES APP] GET DOCTYPES';
export const ADD_DOCTYPE         = '[DOCTYPES APP] ADD DOCTYPE';
export const DISABLE_DOCTYPE      = '[DOCTYPES APP] APPROVE DOCTYPE';
export const UPDATE_DOCTYPE       = '[DOCTYPES APP] UPDATE DOCTYPE';
export const OPEN_COMPOSE_DIALOG  = '[DOCTYPES APP] OPEN COMPOSE DIALOG DOCTYPE';
export const OPEN_UPDATE_COMPOSE_DIALOG  = '[DOCTYPES APP] OPEN UPDATE COMPOSE DIALOG DOCTYPE';
export const CLOSE_COMPOSE_DIALOG = '[DOCTYPES APP] CLOSE COMPOSE DIALOG DOCTYPE';

export function getDocTypes()
{
    const request = axios.get('financialserv/api/v1/userDocTypes');

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type   : GET_DOCTYPES,
                payload: response.data
            })
        );
}

export function getDocType(id)
{
    const request = axios.get('financialserv/api/v1/userDocTypes/' + id);

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type   : GET_DOCTYPE,
                payload: response.data
            })
        );
}

export function updateDocType(data)
{
    const request = axios.put('financialserv/api/v1/userDocTypes/update', data);

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200 && response.statusText === 'OK'){
                dispatch(showMessage({message: 'Document Types has been updated successfully'}));

                Promise.all([
                    dispatch({
                        type: UPDATE_DOCTYPE
                    })
                ]).then(() => dispatch(Actions.getDocTypes()))
            }
        })
}

export function addDocType(data)
{
    const request = axios.post('financialserv/api/v1/userDocTypes/add', data);

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch(showMessage({message: 'Document Types has been added successfully'}));

                Promise.all([
                    dispatch({
                        type: ADD_DOCTYPE
                    })
                ]).then(() => dispatch(Actions.getDocTypes()))
            }
        })
}

export function disableDocType(data)
{
    const request = axios.put('financialserv/api/v1/userDocTypes/update', data);

    return (dispatch) =>

        request.then((response) => {
            dispatch(showMessage({message: 'Document Types has been marked unavailable'}));

            Promise.all([
                dispatch({
                    type: DISABLE_DOCTYPE
                })
            ]).then(() => dispatch(Actions.getDocTypes()))
        })
}

export function openComposeDialog()
{
    const data = {
        name: '',
        description: '',
        type: ''
    };

    return {
        type: OPEN_COMPOSE_DIALOG,
        payload: {
            status: true,
            mode: 'new',
            form: data
        }
    }
}

export function openUpdateComposeDialog(id)
{
    // const request = axios.get('financialserv/api/v1/userDocTypes/' + id);
    return {
        type: OPEN_UPDATE_COMPOSE_DIALOG,
        payload: {
            id,
            status: true,
            mode: 'update'
        }
    }
}

export function closeComposeDialog()
{
    return {
        type: CLOSE_COMPOSE_DIALOG,
        payload: {
            status: false
        }
    }
}
