import firebaseService from '../../../../services/firebaseService';

export const GET_CONTACTS = '[CHAT APP] GET CONTACTS';
export const SET_SELECTED_CONTACT_ID = '[CHAT APP] SET SELECTED CONTACT ID';
export const REMOVE_SELECTED_CONTACT_ID = '[CHAT APP] REMOVE SELECTED CONTACT ID';

export function getContacts() {
    return (dispatch, getState) => {

        const d = JSON.parse(localStorage.getItem('data'));
        
        if(d.data){
            firebaseService.currentUser();
            firebaseService.getAllCustomers(d.data.adUserID)
        }
    }
}

export function setselectedContactId(contactId) {
    return {
        type: SET_SELECTED_CONTACT_ID,
        payload: contactId
    }
}

export function removeSelectedContactId() {
    return {
        type: REMOVE_SELECTED_CONTACT_ID
    }
}
