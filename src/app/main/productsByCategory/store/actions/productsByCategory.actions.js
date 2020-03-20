import axios from 'axios';
import query from 'query-string';

import { tokenConfig, baseUri } from '../../../config.js';

export const GET_PRODUCTS_BY_CATEGORY = '[PRODUCTS BY CATEGORY APP] GET PRODUCTS BY CATEGORY';
export const OPEN_USER_PROFILE = '[PRODUCTS BY CATEGORY APP] OPEN USER PROFILE';
export const SET_SEARCH_TEXT = '[PRODUCTS BY CATEGORY APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_PRODUCT = '[PRODUCTS BY CATEGORY APP] TOGGLE IN SELECTED PRODUCT';
export const SELECT_ALL_PRODUCTS = '[PRODUCTS BY CATEGORY APP] SELECT ALL PRODUCTS';
export const DESELECT_ALL_PRODUCTS = '[PRODUCTS BY CATEGORY APP] DESELECT ALL PRODUCTS';
export const OPEN_NEW_CONTACT_DIALOG = '[PRODUCTS BY CATEGORY APP] OPEN NEW CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[PRODUCTS BY CATEGORY APP] CLOSE NEW CONTACT DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG = '[PRODUCTS BY CATEGORY APP] OPEN EDIT CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[PRODUCTS BY CATEGORY APP] CLOSE EDIT CONTACT DIALOG';
export const ADD_CONTACT = '[PRODUCTS BY CATEGORY APP] ADD CONTACT';
export const UPDATE_INVESTMENT_TYPE = '[PRODUCTS BY CATEGORY APP APP] UPDATE INVESTMENT TYPE';
export const UPDATE_CONTACT = '[PRODUCTS BY CATEGORY APP] UPDATE CONTACT';
export const REMOVE_CONTACT = '[PRODUCTS BY CATEGORY APP] REMOVE CONTACT';
export const REMOVE_CONTACTS = '[PRODUCTS BY CATEGORY APP] REMOVE CONTACTS';
export const TOGGLE_STARRED_CONTACT = '[PRODUCTS BY CATEGORY APP] TOGGLE STARRED CONTACT';
export const TOGGLE_STARRED_CONTACTS = '[PRODUCTS BY CATEGORY APP] TOGGLE STARRED CONTACTS';
export const SET_CONTACTS_STARRED = '[PRODUCTS BY CATEGORY APP] SET CONTACTS STARRED ';

export function getProductsByCategory() {
    const request = axios.get('financialserv/api/v1/productCategories', {
        headers: {
            Authorization: "Bearer " + tokenConfig
        }
    });
    console.log(request, 'getProductsByCategory');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PRODUCTS_BY_CATEGORY,
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
        type: TOGGLE_IN_SELECTED_PRODUCT,
        contactId
    }
}


export function selectAllContacts() {
    return {
        type: SELECT_ALL_PRODUCTS
    }
}

export function deSelectAllContacts() {
    return {
        type: DESELECT_ALL_PRODUCTS
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
    const request = axios.get('authserv/api/v1/users/' + data, {
        headers: {
            Authorization: "Bearer " + tokenConfig
        }
    });
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

export function addContact(newContact) {
    return (dispatch, getState) => {

        const { routeParams } = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/add-contact', {
            newContact
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_CONTACT
                })
            ]).then(() => dispatch(getProductsByCategory(routeParams)))
        );
    };
}

export function updateProductCategories(data) {

    return (dispatch) => {

        const request = axios.put('financialserv/api/v1/investmentTypes/update', data);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_INVESTMENT_TYPE
                })
            ]).then(() => dispatch(getProductsByCategory()))
        );
    };
}

export function removeContact(contactId) {
    return (dispatch, getState) => {

        const { routeParams } = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/remove-contact', {
            contactId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_CONTACT
                })
            ]).then(() => dispatch(getProductsByCategory(routeParams)))
        );
    };
}


export function removeContacts(contactIds) {
    return (dispatch, getState) => {

        const { routeParams } = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/remove-contacts', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_CONTACTS
                }),
                dispatch({
                    type: DESELECT_ALL_PRODUCTS
                })
            ]).then(() => dispatch(getProductsByCategory(routeParams)))
        );
    };
}

// export function toggleStarredContact(contactId) {
//     return (dispatch, getState) => {
//         const { routeParams } = getState().contactsApp.contacts;

//         const request = axios.post('/api/contacts-app/toggle-starred-contact', {
//             contactId
//         });

//         return request.then((response) =>
//             Promise.all([
//                 dispatch({
//                     type: TOGGLE_STARRED_CONTACT
//                 }),
//                 dispatch(getUserData())
//             ]).then(() => dispatch(getInvestmentTypes(routeParams)))
//         );
//     };
// }

// export function toggleStarredContacts(contactIds) {
//     return (dispatch, getState) => {

//         const { routeParams } = getState().contactsApp.contacts;

//         const request = axios.post('/api/contacts-app/toggle-starred-contacts', {
//             contactIds
//         });

//         return request.then((response) =>
//             Promise.all([
//                 dispatch({
//                     type: TOGGLE_STARRED_CONTACTS
//                 }),
//                 dispatch({
//                     type: DESELECT_ALL_CONTACTS
//                 }),
//                 dispatch(getUserData())
//             ]).then(() => dispatch(getInvestmentTypes(routeParams)))
//         );
//     };
// }

// export function setContactsStarred(contactIds) {
//     return (dispatch, getState) => {

//         const { routeParams } = getState().contactsApp.contacts;

//         const request = axios.post('/api/contacts-app/set-contacts-starred', {
//             contactIds
//         });

//         return request.then((response) =>
//             Promise.all([
//                 dispatch({
//                     type: SET_CONTACTS_STARRED
//                 }),
//                 dispatch({
//                     type: DESELECT_ALL_CONTACTS
//                 }),
//                 dispatch(getUserData())
//             ]).then(() => dispatch(getInvestmentTypes(routeParams)))
//         );
//     };
// }

// export function setContactsUnstarred(contactIds) {
//     return (dispatch, getState) => {

//         const { routeParams } = getState().contactsApp.contacts;

//         const request = axios.post('/api/contacts-app/set-contacts-unstarred', {
//             contactIds
//         });

//         return request.then((response) =>
//             Promise.all([
//                 dispatch({
//                     type: SET_CONTACTS_STARRED
//                 }),
//                 dispatch({
//                     type: DESELECT_ALL_CONTACTS
//                 }),
//                 dispatch(getUserData())
//             ]).then(() => dispatch(getInvestmentTypes(routeParams)))
//         );
//     };
// }
