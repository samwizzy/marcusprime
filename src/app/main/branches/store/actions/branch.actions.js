import axios from 'axios';

export const GET_ADMINS = '[BRANCHES APP] GET ADMINS';
export const SAVE_BRANCH_ADMIN = '[BRANCHES APP] SAVE BRANCH ADMIN';
export const GET_BRANCHES = '[BRANCHES APP] GET BRANCHES';
export const GET_ALL_UBN_BRANCHES = '[BRANCHES APP] GET ALL UBN BRANCHES';
export const UPDATE_BRANCH = '[BRANCHES APP] UPDATE BRANCH';
export const DISABLE_BRANCH = '[BRANCHES APP] DISABLE BRANCH';
export const OPEN_NEW_BRANCH_DIALOG = '[BRANCHES APP] OPEN NEW BRANCH DIALOG';
export const CLOSE_NEW_BRANCH_DIALOG = '[BRANCHES APP] CLOSE NEW BRANCH DIALOG';
export const OPEN_EDIT_BRANCH_DIALOG = '[BRANCHES APP] OPEN EDIT BRANCH DIALOG';
export const CLOSE_EDIT_BRANCH_DIALOG = '[BRANCHES APP] CLOSE EDIT BRANCH DIALOG';

export function getAllUBNBranches() {
    const request = axios.get('financialserv/api/v1/branch/get_ubn_branches');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ALL_UBN_BRANCHES,
                payload: response.data,
            })
        );
}

export function getAllAdmins() {
    const request = axios.get('authserv/api/v1/admin/users');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ADMINS,
                payload: response.data
            })
        );
}

export function getBranches() {

    const request = axios.get('financialserv/api/v1/branches');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_BRANCHES,
                payload: response.data,
            })
        );
}

export function openNewRateDialog() {
    return {
        type: OPEN_NEW_BRANCH_DIALOG
    }
}

export function closeNewRateDialog() {
    return {
        type: CLOSE_NEW_BRANCH_DIALOG
    }
}

export function addRate(data) {
    const request = axios.post('financialserv/api/v1/branches/add', data);

    return (dispatch) =>
        request.then((response) =>
            Promise.all([
                dispatch({
                    type: SAVE_BRANCH_ADMIN,
                    payload: response.data,
                })
            ]).then(() => dispatch(getBranches()))
        );
}

export function openEditRateDialog(data) {
    return {
        type: OPEN_EDIT_BRANCH_DIALOG,
        data
    }
}

export function closeEditRateDialog() {
    return {
        type: CLOSE_EDIT_BRANCH_DIALOG
    }
}

export function updateRate(data) {

    const request = axios.put('financialserv/api/v1/branch/update', data);

    return (dispatch) =>
        request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_BRANCH,
                    payload: response.data,
                })
            ]).then(() => dispatch(getBranches()))
        );
}
