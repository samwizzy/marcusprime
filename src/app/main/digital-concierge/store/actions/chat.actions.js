import firebaseService from '../../../../services/firebaseService';

export const GET_CHAT = '[CHAT APP] GET CHAT';
export const REMOVE_CHAT = '[CHAT APP] REMOVE CHAT';
export const SEND_MESSAGE = '[CHAT APP] SEND MESSAGE';

export function getChat(contactId) {

    return (dispatch) => {

        firebaseService.openChatLists(contactId)
    }
}

export function removeChat() {
    return {
        type: REMOVE_CHAT
    };
}

export function sendMessage(messageText, userId, rmId) {
    const message = {
        'rmId': rmId,
        'userId': userId,
        'message': messageText,
        'type': 'text',
        'time': new Date().getTime(),
    };

    return (dispatch) =>
        firebaseService.sendChat(message)
            .then((msg) => {

                console.log(msg, 'msg')

                return dispatch({
                    type: SEND_MESSAGE,
                    message: msg,
                });
            }
            )
}
