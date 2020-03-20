import axios from 'axios';
import query from 'query-string';

import { tokenConfig, baseUri } from '../../../config';

export const GET_INVESTMENT_TYPES = '[INVESTMENT TYPES APP] GET INVESTMENT TYPES';
export const OPEN_USER_PROFILE = '[ACCOUNTS APP] OPEN USER PROFILE';
export const SET_SEARCH_TEXT = '[ACCOUNTS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_CONTACTS = '[ACCOUNTS APP] TOGGLE IN SELECTED CONTACTS';
export const SELECT_ALL_CONTACTS = '[ACCOUNTS APP] SELECT ALL CONTACTS';
export const DESELECT_ALL_CONTACTS = '[ACCOUNTS APP] DESELECT ALL CONTACTS';
export const OPEN_NEW_CONTACT_DIALOG = '[ACCOUNTS APP] OPEN NEW CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[ACCOUNTS APP] CLOSE NEW CONTACT DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG = '[ACCOUNTS APP] OPEN EDIT CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[ACCOUNTS APP] CLOSE EDIT CONTACT DIALOG';
export const UPDATE_INVESTMENT_TYPE = '[INVESTMENT TYPE APP] UPDATE INVESTMENT TYPE';

export function getInvestmentTypes() {
    const request = axios.get('financialserv/api/v1/investmentTypes');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_INVESTMENT_TYPES,
                payload: response.data,
            })
        );
}

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedContacts(contactId) {
    return {
        type: TOGGLE_IN_SELECTED_CONTACTS,
        contactId
    }
}


export function selectAllContacts() {
    return {
        type: SELECT_ALL_CONTACTS
    }
}

export function deSelectAllContacts() {
    return {
        type: DESELECT_ALL_CONTACTS
    }
}


export function openNewContactDialog() {
    return {
        type: OPEN_NEW_CONTACT_DIALOG
    }
}

export function closeNewContactDialog() {
    return {
        type: CLOSE_NEW_CONTACT_DIALOG
    }
}

export function getUserProfile(data) {
    const request = axios.get('authserv/api/v1/users/' + data);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: OPEN_USER_PROFILE,
                payload: response.data,
            })
        );
}

export function openEditContactDialog(data) {
    return {
        type: OPEN_EDIT_CONTACT_DIALOG,
        data
    }
}

export function closeEditContactDialog() {
    return {
        type: CLOSE_EDIT_CONTACT_DIALOG
    }
}

export function updateInvestmentType(data) {

    return (dispatch) => {

        const request = axios.put('financialserv/api/v1/investmentTypes/update', data);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_INVESTMENT_TYPE
                })
            ]).then(() => dispatch(getInvestmentTypes()))
        );
    };
}
