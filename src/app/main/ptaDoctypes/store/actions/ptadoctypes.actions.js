import axios from 'axios';
import {FuseUtils} from '../../../../../@fuse';
import {showMessage} from '../../../../store/actions/fuse';
import * as Actions from '.'

export const GET_PTA_DOCTYPES            = '[DOCTYPES APP] GET PTA DOCTYPES';
export const GET_PTA_DOCTYPE             = '[DOCTYPES APP] GET PTA DOCTYPE';
export const REMOVE_PTA_DOCTYPE          = '[DOCTYPES APP] REMOVE PTA DOCTYPE';
export const ADD_PTA_DOCTYPE             = '[DOCTYPES APP] ADD PTA DOCTYPE';
export const GET_DOCTYPES                = '[DOCTYPES APP] GET DOCTYPE';
export const DISABLE_PTA_DOCTYPE         = '[DOCTYPES APP] APPROVE PTA DOCTYPE';
export const UPDATE_PTA_DOCTYPE          = '[DOCTYPES APP] UPDATE PTA DOCTYPE';
export const OPEN_COMPOSE_DIALOG         = '[DOCTYPES APP] OPEN COMPOSE DIALOG PTA DOCTYPE';
export const OPEN_UPDATE_COMPOSE_DIALOG  = '[DOCTYPES APP] OPEN UPDATE COMPOSE DIALOG PTA DOCTYPE';
export const CLOSE_COMPOSE_DIALOG        = '[DOCTYPES APP] CLOSE COMPOSE DIALOG PTA DOCTYPE';

export function addPtaDocType(params)
{
    const { fxCatId, doctypeId } = params
    const request = axios.post(`financialserv/api/v1/fxCategory/set_doc_types?doctypeId=${doctypeId}&fxCatId=${fxCatId}`);
    // const request = axios.post('financialserv/api/v1/fxCategory/set_doc_types', { params });

    return (dispatch) =>

        request.then((response) => {
            console.log(response, "response")
            if(response.status === 200){
                dispatch(showMessage({message: 'PTA Document Types has been added successfully'}));

                Promise.all([
                    dispatch({
                        type: ADD_PTA_DOCTYPE
                    })
                ]).then(() => dispatch(Actions.closeComposeDialog()))
                .then(() => dispatch(Actions.getPtaDocTypes({fxCatId})))
            }
        }).catch(err => dispatch(showMessage({message: err.response.data.message})))
}

export function getPtaDocTypes(params)
{
    const request = axios.get('financialserv/api/v1/fxCategories/get_doc_types', { params });

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type   : GET_PTA_DOCTYPES,
                payload: response.data
            })
        );
}

export function removePtaDocTypes(params)
{
    const { fxCatId, doctypeId } = params
    // const request = axios.post('financialserv/api/v1/fxCategory/remove_document_from_fx_category', { params });
    const request = axios.post(`financialserv/api/v1/fxCategory/remove_document_from_fx_category?doctypeId=${params.doctypeId}&fxCatId=${params.fxCatId}`);

    return (dispatch) =>
        request.then((response) => 
            Promise.all([
                dispatch({
                    type   : REMOVE_PTA_DOCTYPE,
                    payload: response.data
                })
            ]).then(() => dispatch(Actions.getPtaDocTypes({fxCatId})))
        );
}

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

export function getPtaDocType(id)
{
    const request = axios.get('financialserv/api/v1/userDocTypes/' + id);

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type   : GET_PTA_DOCTYPE,
                payload: response.data
            })
        );
}


export function disablePtaDocType(data)
{
    const request = axios.put('financialserv/api/v1/userDocTypes/update', data);

    return (dispatch) =>

        request.then((response) => {
            dispatch(showMessage({message: 'PTA Document Types has been marked unavailable'}));

            Promise.all([
                dispatch({
                    type: DISABLE_PTA_DOCTYPE
                })
            ]).then(() => dispatch(Actions.getPtaDocTypes()), dispatch(Actions.closeComposeDialog()))
        })
}

export function openComposeDialog()
{
    return {
        type: OPEN_COMPOSE_DIALOG,
        payload: {
            status: true,
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
