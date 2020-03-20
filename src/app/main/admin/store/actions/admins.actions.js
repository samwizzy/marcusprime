import axios from 'axios';

export const GET_ADMINS = '[ADMIN APP] GET ADMINS';
export const GET_ROLES = '[ADMIN APP] GET ROLES';
export const GET_BRANCHES = '[ADMIN APP] GET BRANCHES';
export const SET_ORDERS_SEARCH_TEXT = '[ADMIN APP] SET ADMINS SEARCH TEXT';
export const OPEN_COMPOSE_DIALOG = '[ADMIN APP] OPEN COMPOSE DIALOG';
export const OPEN_EDIT_USER_DIALOG = '[ADMIN APP] OPEN EDIT USER DIALOG';
export const CLOSE_COMPOSE_DIALOG = '[ADMIN APP] CLOSE COMPOSE DIALOG';

export function getAdmins()
{
    const request = axios.get('authserv/api/v1/admin/users');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ADMINS,
                payload: response.data
            })
        );
}

export function getBranches()
{
    const request = axios.get('financialserv/api/v1/branch/get_ubn_branches');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_BRANCHES,
                payload: response.data
            })
        );
}

export function getRoles()
{
    const request = axios.get('authserv/api/v1/roles');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ROLES,
                payload: response.data
            })
        );
}

export function setOrdersSearchText(event)
{
    return {
        type      : SET_ORDERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function openEditUserDialog(id) {
    const request = axios.get('authserv/api/v1/admin/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: OPEN_EDIT_USER_DIALOG,
                payload: {
                    mode: 'edit',
                    status: true,
                    data: response.data
                }
            })
        );
}

export function openComposeDialog()
{
    return {
        type: OPEN_COMPOSE_DIALOG,
        payload: true
    }
}

export function closeComposeDialog()
{
    return {
        type: CLOSE_COMPOSE_DIALOG,
        payload: false
    }
}

