import axios from 'axios';
import {FuseUtils} from '../../../../../@fuse';
import {showMessage} from '../../../../../app/store/actions/fuse';
import * as Actions from './';
// import 'app/fuse-configs/axiosConfig';

export const GET_ROLE = '[ROLE APP] GET ROLE';
export const NEW_ROLE = '[ROLE APP] NEW ROLE';
export const SAVE_ROLE = '[ROLE APP] SAVE ROLE';
export const UPDATE_ROLE = '[ROLE APP] UPDATE ROLE';
export const DELETE_ROLE = '[ROLE APP] DELETE ROLE';
export const SET_ROLES_BY_ID = '[ROLE APP] SAVE ROLE';

export function addRole(data)
{
    const request = axios.post('authserv/api/v1/roles/add', data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Role Saved'}));

                Promise.all([
                    dispatch({
                        type   : SAVE_ROLE,
                        payload: response.data
                    })
                ]).then(() => dispatch(Actions.getRoles()))
            }
        );
}

export function getRole(param)
{
    const request = axios.get('authserv/api/v1/roles/' + param);

    return (dispatch) =>
        request.then((response) => 
        
            dispatch({
                type   : GET_ROLE,
                mode: "update",
                payload: response.data
            })
        );
}

export function updateRole(param)
{
    const request = axios.put('authserv/api/v1/roles/update', param);

    return (dispatch) =>

        request.then((response) => {
            dispatch(showMessage({message: 'Role Updated'}));

            Promise.all([
                dispatch({
                    type: UPDATE_ROLE
                })
            ]).then(() => dispatch(Actions.getRoles()))
        })
}

export function deleteRole(id)
{
    const request = axios.delete('authserv/api/v1/roles/' + id);

    return (dispatch) =>

        request.then((response) => {
            Promise.all([
                dispatch({
                    type: DELETE_ROLE
                })
            ]).then(() => dispatch(Actions.getRoles()))
        })
}

export function newRole()
{
    const data = {
        name: '',
        description: '',
        updatedBy: null,
        addedBy: null,
        createdBy: null,
        createdAt: null,
    };

    return {
        type   : NEW_ROLE,
        mode: "new",
        payload: data
    }
}
