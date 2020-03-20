import axios from 'axios';
import {FuseUtils} from '../../../../../@fuse';
import {showMessage} from '../../../../../app/store/actions/fuse';
import * as Actions from './'

export const GET_MODULES = '[RIGHT APP] GET MODULES';
export const GET_ROLE_RIGHTS = '[RIGHT APP] GET RIGHTS';
export const GET_ROLE_RIGHT = '[RIGHT APP] GET RIGHT';
export const SAVE_ROLE_RIGHT = '[RIGHT APP] SAVE ROLE RIGHT';
export const SAVE_MODULE_RIGHT = '[RIGHT APP]  MODULE RIGHT';
export const UPDATE_ROLE_RIGHT = '[RIGHT APP] UPDATE RIGHT';
export const DELETE_ROLE_RIGHT = '[RIGHT APP] DELETE RIGHT';
export const SET_ROLE_RIGHTS_BY_ID = '[RIGHT APP] SAVE RIGHT';
export const OPEN_NEW_RIGHT_DIALOG = '[RIGHT APP] OPEN NEW RIGHT DIALOG';
export const CLOSE_NEW_RIGHT_DIALOG = '[RIGHT APP] CLOSE NEW RIGHT DIALOG';


export function getModules()
{
    const request = axios.get('authserv/api/v1/modules');

    return (dispatch) =>
        request.then((response) => {
                return dispatch({
                    type   : GET_MODULES,
                    payload: response.data
                })
            }
        );
}

export function getRoleRights()
{
    const request = axios.get('authserv/api/v1/roleRights');

    return (dispatch) =>
        request.then((response) => {
                return dispatch({
                    type   : GET_ROLE_RIGHTS,
                    payload: response.data
                })
            }
        );
}

export function getRoleRight(id)
{
    const request = axios.get(`authserv/api/v1/role/${id}/getRights`);

    return (dispatch) =>
        request.then((response) => {
                return dispatch({
                    type   : GET_ROLE_RIGHT,
                    payload: response.data
                })
            }
        );
}

export function addRoleRight(data)
{
    const request = axios.post('authserv/api/v1/roleRights/add', data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Role Rights Saved'}));

                Promise.all([
                    dispatch({
                        type   : SAVE_ROLE_RIGHT,
                        payload: response.data
                    })
                ]).then(() => dispatch(Actions.closeNewRightDialog()))
                
            }
        );
}

export function addModuleRight(data)
{
    const request = axios.post('authserv/api/v1/roleRights/add', data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Module Rights Saved'}));

                return dispatch({
                    type   : SAVE_MODULE_RIGHT,
                    payload: response.data
                })
            }
        );
}

export function updateRoleRight(data)
{
    const request = axios.put('authserv/api/v1/roleRights/update', data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Role Rights Succesfully Updated'}));

                return dispatch({
                    type   : UPDATE_ROLE_RIGHT,
                    payload: response.data
                })
            }
        );
}

export function deleteRight(id)
{
    const request = axios.delete('authserv/api/v1/roleRights/delete' + id);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'RIGHT Deleted'}));

                return dispatch({
                    type   : DELETE_ROLE_RIGHT,
                    payload: response.data
                })
            }
        );
}

export function openNewRightDialog() {
    const data = {
        modulesIds: [],
        roleId: 0
    }

    return {
        type: OPEN_NEW_RIGHT_DIALOG,
        payload: {
            status: true,
            data
        }
    }
}

export function closeNewRightDialog() {
    return {
        type: CLOSE_NEW_RIGHT_DIALOG,
        payload: {
            status: false,
        }
    }
}

export function newRight()
{
    const data = {
        id              : FuseUtils.generateGUID(),
        name            : '',
        email          : '',
        RIGHT          : '',
        description     : '',
        active          : true
    };

    return {
        type   : GET_ROLE_RIGHT,
        payload: data
    }
}
