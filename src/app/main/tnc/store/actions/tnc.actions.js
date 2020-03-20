import axios from 'axios';
import {FuseUtils} from '../../../../../@fuse';
import {showMessage} from '../../../../../app/store/actions/fuse';
import * as Actions from './';

export const GET_TNCS = '[TNC APP] GET TNCS';
export const GET_TNC = '[TNC APP] GET TNC';
export const UPDATE_TNC = '[TNC APP] UPDATE TNC';
export const SAVE_TNC = '[TNC APP] SAVE TNC';

export function getTncs()
{
    const request = axios.get('authserv/api/v1/languages');

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type: GET_TNCS,
                payload: response.data
            })
        )
}

export function getTnc(id)
{
    const request = axios.get('authserv/api/v1/languages/' + id);

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type: GET_TNC,
                payload: response.data
            })
        )
}

export function updateTnc(data)
{
    const request = axios.put('authserv/api/v1/languages/update', data);

    return (dispatch) =>

        request.then((response) => {
            if(response.statusText === 'OK' && response.status === 200){
                dispatch(showMessage({message: 'Tnc has been updated successfully'}));

                Promise.all([
                    dispatch({
                        type: UPDATE_TNC
                    })
                ]).then(() => dispatch(Actions.getTncs()))
            }
        })
}

export function saveTnc(data)
{
    const request = axios.put('authserv/api/v1/languages/add', data);

    return (dispatch) =>

        request.then((response) => {
            dispatch(showMessage({message: 'TNC has been saved successfully'}));

            Promise.all([
                dispatch({
                    type: SAVE_TNC
                })
            ]).then(() => dispatch(Actions.getTncs()))
        })
}
