// import axios from 'axios';
// import {showMessage} from '../../../../../app/store/actions/fuse';

// export const GET_ROLE = '[ROLE APP] GET ROLES';
// export const ADD_ROLE = '[ROLE APP] ADD ROLES';
// export const SUCCESS_ROLE = '[ROLE APP] SUCCESS ROLES';
// export const ERROR_ROLE = '[ROLE APP] ERROR ROLES';

// export function getRole(routeParams)
// {
//     const request = axios.get('authserv/api/v1/roles', {
//         params: routeParams
//     });

//     return (dispatch) =>
//         request.then((response) =>
//             dispatch({
//                 type   : GET_ROLE,
//                 routeParams: routeParams,
//                 payload: response.data
//             })
//         );
// }

// export function addRole(data)
// {
//     const request = axios.post('authserv/api/v1/roles/add', data);

//     return (dispatch) => {
//         dispatch(showMessage({message: 'Role Saved'}));
        
//         request.then((response) => {
//             console.log(response, "Debugging shit");
//             if(response.status === 200 && response.statusText === "OK"){
//                 dispatch({
//                     type   : SUCCESS_ROLE,
//                     payload: { message : "Role has been added successfully" }
//                 })
//             }else{
//                 dispatch({
//                     type   : ERROR_ROLE,
//                     payload: { message: "Role failed to add" }
//                 })
//             }
//         });
        
        
//     }
// }

// export function addRoleToAdmin(data)
// {
//     const request = axios.post('authserv/api/v1/roles/add', data);

//     return (dispatch) => {
//         dispatch(showMessage({message: 'Role Saved'}));
        
//         request.then((response) => {
//             console.log(response, "Debugging shit");
//             if(response.status === 200 && response.statusText === "OK"){
//                 dispatch({
//                     type   : SUCCESS_ROLE,
//                     payload: { message : "Role has been added successfully" }
//                 })
//             }else{
//                 dispatch({
//                     type   : ERROR_ROLE,
//                     payload: { message: "Role failed to add" }
//                 })
//             }
//         });
        
        
//     }
// }