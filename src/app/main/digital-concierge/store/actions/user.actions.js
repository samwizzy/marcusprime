import axios from 'axios';
import firebaseService from '../../../../services/firebaseService';

export const GET_USER_DATA = '[CHAT APP] GET USER DATA';
export const UPDATE_USER_DATA = '[CHAT APP] UPDATE USER DATA';


export function getUserData() {
    return (dispatch) => {

        // console.log(firebaseData, 'firebaseData getUserData')
        const user = firebaseService.currentUser()

        // console.log(user, 'firebase user get called')
        if (user) {
            // console.log(user, 'firebass user from fire to fire')
            if (user.displayName === 'cs') {
                // console.log('Am here 1')
                firebaseService.checkUserInCSNode(user.email)
                    .then(csUser => {
                        // console.log('Am here 2')
                        // console.log(csUser, 'csUser 1')
                        firebaseService.checkUserInChatNode(csUser.adUserID)
                            .then(userChat => {
                                // console.log('Am here 3')
                                // console.log(userChat, 'userChat')
                                // console.log(csUser, 'csUser')
                                return dispatch({
                                    type: GET_USER_DATA,
                                    payload: { userChat, csUser }
                                });
                            })
                    })

            } else if (user.displayName === 'rm') {

                firebaseService.checkUserInRMNode(user.email)
                    .then(csUser => {
                        firebaseService.checkUserInChatNode(csUser.adUserID)
                            .then(userChat => {
                                // console.log(userChat, 'userChat')
                                // console.log(csUser, 'csUser')
                                return dispatch({
                                    type: GET_USER_DATA,
                                    payload: { userChat, csUser }
                                    // user: csUser,
                                });
                            })
                    })

            }
        } else {

        }
    }
}

export function updateUserData(newData) {
    const request = axios.post('/api/chat/user/data', newData);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: UPDATE_USER_DATA,
                payload: response.data
            })
        );
}
