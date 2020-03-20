import axios from 'axios';
import {showMessage} from '../../../../../app/store/actions/fuse';
import * as Actions from './'

export const NEW_DEPARTMENT = '[DEPARTMENT APP] NEW DEPARTMENT';
export const GET_DEPARTMENT = '[DEPARTMENT APP] GET DEPARTMENT';
export const UPDATE_DEPARTMENT = '[DEPARTMENT APP] UPDATE DEPARTMENT';
export const DELETE_DEPARTMENT = '[DEPARTMENT APP] DELETE DEPARTMENT';
export const GET_DEPARTMENTS = '[DEPARTMENT APP] GET DEPARTMENTS';
export const ADD_DEPARTMENT = '[DEPARTMENT APP] ADD DEPARTMENT';
export const DEPARTMENT_SUCCESS = '[DEPARTMENT APP] DEPARTMENT SUCCESS';
export const DEPARTMENT_ERROR = '[DEPARTMENT APP] DEPARTMENT ERROR';


export function getDepartments()
{
    const request = axios.get('conciergeserv/api/v1/departments');

    return (dispatch) =>
        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_DEPARTMENTS,
                    payload: response.data
                })
            }
        });
}

export function getDepartment(id)
{
    const request = axios.get('conciergeserv/api/v1/departments/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DEPARTMENT,
                mode: "update",
                payload: response.data
            })
        );
}

export function addDepartment(data)
{
    const request = axios.post('conciergeserv/api/v1/departments/add', data);

    return (dispatch) => {
        
        request.then((response) => {
            if(response.status === 200){
                dispatch(showMessage({message: 'Department Successfully Added'}));
                Promise.all([
                    dispatch({
                        type   : GET_DEPARTMENT,
                        payload: response.data
                    })
                ]).then(() => dispatch(Actions.getDepartments()))
            }else{
                dispatch(showMessage({message: 'Adding Department failed, Please try again'}));

                dispatch({
                    type   : GET_DEPARTMENT,
                    payload: response.data
                })
            }
        });
        
        
    }
}

export function updateDepartment(data)
{
    const request = axios.put('conciergeserv/api/v1/department/update', data);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'Department has been updated successfully'}));

            Promise.all([
                dispatch({
                    type   : UPDATE_DEPARTMENT,
                    payload: response.data
                })
            ]).then(() => dispatch(Actions.getDepartments()))
            
        });
}

export function deleteDepartment(id)
{
    const request = axios.delete('conciergeserv/api/v1/department/delete/' + id);

    return (dispatch) =>
        request.then((response) =>

            Promise.all([
                dispatch({
                    type   : DELETE_DEPARTMENT,
                    payload: response.data
                })
            ]).then(() => dispatch(Actions.getDepartments()))
            
        );
}

export function newDepartment()
{
    const data = {
        id: '',
        name: '',
        contactPersonId: '',
    };

    return {
        type   : NEW_DEPARTMENT,
        mode: "new",
        payload: data
    }
}

