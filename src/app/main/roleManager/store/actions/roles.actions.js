import axios from 'axios';
import {showMessage} from '../../../../../app/store/actions/fuse';
import * as Actions from './'

export const ADD_ROLE = '[ROLES APP] ADD ROLE';
export const GET_ROLES = '[ROLES APP] GET ROLES';
export const GET_ROLE = '[ROLES APP] GET ROLE';
export const UPDATE_ROLES = '[ROLE APP] UPDATE ROLES';
export const SELECT_ALL_ROLES = '[ROLES] SELECT ALL ROLES';
export const SUCCESS_ROLE = '[ROLE APP] SUCCESS ROLES';
export const ERROR_ROLE = '[ROLE APP] ERROR ROLES';
export const DESELECT_ALL_ROLES = '[ROLES] DESELECT ALL ROLES';
export const TOGGLE_IN_SELECTED_ROLES = '[ROLES] TOGGLE IN SELECTED ROLES';
export const SELECT_ROLES_BY_PARAMETER = '[ROLES] SELECT ROLES BY PARAMETER';
export const SET_FOLDER_ON_SELECTED_ROLES = '[ROLES] SET FOLDER ON SELECTED ROLES';
export const TOGGLE_LABEL_ON_SELECTED_ROLES = '[ROLES] TOGGLE LABEL ON SELECTED ROLES';
export const SET_SEARCH_TEXT = '[ROLES] SET SEARCH TEXT';

export function getRoles()
{
    const request = axios.get('authserv/api/v1/roles');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_ROLES,
                payload    : response.data
            })
        );
}

export function getRole(id)
{
    const request = axios.get('authserv/api/v1/roles/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ROLE,
                payload: response.data
            })
        );
}

export function addRole(data)
{
    const request = axios.post('authserv/api/v1/roles/add', data);

    return (dispatch) => {
        dispatch(showMessage({message: 'Role Saved'}));
        
        request.then((response) => {
            if(response.status === 200 && response.statusText === "OK"){
                Promise.all([
                    dispatch({
                        type   : ADD_ROLE,
                        payload: { message : "Role has been added successfully" }
                    })
                ]).then(() => dispatch(Actions.getRoles()))
            }
        });   
    }
}

export function addRoleToAdmin(data)
{
    const request = axios.post('authserv/api/v1/roles/add', data);

    return (dispatch) => {
        dispatch(showMessage({message: 'Role Saved'}));
        
        request.then((response) => {
            if(response.status === 200 && response.statusText === "OK"){
                Promise.all([
                    dispatch({
                        type   : SUCCESS_ROLE,
                        payload: { message : "Role has been added successfully" }
                    })
                ]).then(() => dispatch(Actions.getRoles()))
            }else{
                dispatch({
                    type   : ERROR_ROLE,
                    payload: { message: "Role failed to add" }
                })
            }
        });
        
        
    }
}

export function updateRoles()
{
    return (dispatch, getState) => {

        const {routeParams} = getState().rolesApp.roles;

        const request = axios.get('authserv/api/v1/roles', {
            params: routeParams
        });

        return request.then((response) => 
            Promise.all([
                dispatch({
                    type   : UPDATE_ROLES,
                    payload: response.data
                })
            ]).then(() => dispatch(Actions.getRoles()))
        );
    }
}

export function selectAllRoles()
{
    return {
        type: SELECT_ALL_ROLES
    }
}

export function deselectAllRoles()
{
    return {
        type: DESELECT_ALL_ROLES
    }
}

export function selectRolesByParameter(parameter, value)
{
    return {
        type   : SELECT_ROLES_BY_PARAMETER,
        payload: {
            parameter,
            value
        }
    }
}

export function toggleInSelectedRoles(roleId)
{
    return {
        type: TOGGLE_IN_SELECTED_ROLES,
        roleId
    }
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function setFolderOnSelectedRoles(id)
{
    return (dispatch, getState) => {
        const selectedRoleIds = getState().roleApp.roles.selectedRoleIds;

        const request = axios.post('/api/roles-app/set-folder', {
            selectedRoleIds,
            folderId: id
        });

        return request.then((response) => {
                dispatch({
                    type: SET_FOLDER_ON_SELECTED_ROLES
                });
                return dispatch(updateRoles())
            }
        );
    }
}

export function toggleLabelOnSelectedRoles(id)
{
    return (dispatch, getState) => {
        const selectedRoleIds = getState().roleApp.roles.selectedRoleIds;

        const request = axios.post('/api/roles-app/toggle-label', {
            selectedRoleIds,
            labelId: id
        });

        return request.then((response) => {
                dispatch({
                    type: TOGGLE_LABEL_ON_SELECTED_ROLES
                });
                return dispatch(updateRoles())
            }
        );
    }
}
