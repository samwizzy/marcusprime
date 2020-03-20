import axios from 'axios';
import {FuseUtils} from '../../../../../@fuse';
import {showMessage} from '../../../../../app/store/actions/fuse';
import * as Actions from './';
import qs from 'qs'

export const GET_PTA = '[PTA APP] GET PTA';
export const GET_PTAS = '[PTA APP] GET PTAS';
export const GET_DOC_PTA = '[PTA APP] GET DOC PTA';
export const GET_PTA_BY_CAT_BRANCH = '[PTA APP] GET PTA BY CAT BRANCH';
export const APPROVED_PTA = '[PTA APP] APPROVED PTA';
export const DECLINE_PTA = '[PTA APP] DECLINE PTA';
export const OPEN_DIALOG = '[PTA APP] OPEN DIALOG';
export const CLOSE_DIALOG = '[PTA APP] CLOSE DIALOG';

export function getPta()
{
    const request = axios.get('financialserv/api/v1/fxs');

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type: GET_PTAS,
                payload: response.data
            })
        )
}

export function getPtaById(id)
{
    const request = axios.get('financialserv/api/v1/fxs/' + id);

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type: GET_PTA,
                payload: response.data
            })
        )
}

export function getPtaDocById(id)
{
    const request = axios.get('financialserv/api/v1/userDocuments/retrieve/' + id);

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type: GET_DOC_PTA,
                payload: response.data
            })
        )
}

export function openComposeDialog(id, action)
{
    return (dispatch) =>
        Promise.all([
            dispatch({
                type: OPEN_DIALOG,
                payload: {
                    status: true,
                    action
                }
            })
        ]).then(() => dispatch(Actions.getPtaById(id)))
        
}

export function closeComposeDialog()
{
    return (dispatch) =>
        dispatch({
            type: CLOSE_DIALOG,
            payload: {
                status: false
            }
        })
        
}

export function getPtaByCatAndBranch(params)
{
    const request = axios.get('financialserv/api/v1/fxsByCatAndBranch', {
        params: params
    }
    );

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type: GET_PTA_BY_CAT_BRANCH,
                payload: response.data
            })
        )
}

export function approvePta(data)
{
    const request = axios.post('financialserv/api/v1/pta/set_status', qs.stringify(data));

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch(showMessage({message: 'PTA has been approved'}));

                Promise.all([
                    dispatch({
                        type: APPROVED_PTA,
                        payload: response.data,
                        status: false
                    })
                ]).then(() => dispatch(Actions.getPta()))
            }
        })
}

export function declinePta(data)
{
    const request = axios.post('financialserv/api/v1/pta/set_status', qs.stringify(data));

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch(showMessage({message: 'PTA has been declined'}));

                Promise.all([
                    dispatch({
                        type: DECLINE_PTA,
                        payload: response.data,
                        status: false
                    })
                ]).then(() => dispatch(Actions.getPta()))
            }
        })
}
