import * as Actions from '../actions';
import _ from "lodash";

const userReducer = function (state = null, action) {
    switch (action.type) {
        case Actions.GET_USER_DATA:
            {
                return { ...action.payload };
            }
        case Actions.UPDATE_USER_DATA:
            {
                return { ...action.payload };
            }
        case Actions.GET_CHAT:
            {
                // console.log(state, 'state from fire to fire')
                return getUpdatedUser(state, action);
            }
        case Actions.SEND_MESSAGE:
            {
                return getUpdatedUser(state, action);
            }
        default:
            return state;
    }
};

function getUpdatedUser(state, action) {

    // console.log(state, 'state from fire to fire')
    // console.log(action, 'action from fire to fire')

    let newUserData = _.merge({}, state);

    console.log(newUserData, 'newUserData from fire to fire')

    // console.log(newUserData.userChat, 'newUserData.userChat.adteslim')
    // const newUserDatta1 = Object.keys(newUserData.userChat).map(key => {
    //     console.log(newUserData.userChat.key, 'newUserData.userChat.key')
    //     // return newUserData.userChat.chatList[key];
    // })

    // const newUserDatta2 = Object.keys(newUserData.userChat.chatList).map(key => {
    //     return newUserData.userChat.chatList[key];
    // })

    // console.log(newUserDatta1, 'newUserDatta')
    // console.log(action.contactId, 'action.contactId')

    // let userChatData = newUserData.userChat.adteslim.chatList.find(_chat => _chat.id === action.contactId);

    // console.log(userChatData, 'userChatData')

    // if (userChatData) {
    //     newUserData.userChat.adteslim.chatList = newUserData.userChat.adteslim.chatList.map(_chat => _chat.id === action.contactId ? action.contactId : _chat);
    // }
    // else {
    //     newUserData.userChat.adteslim.chatList = [action.contactId, ...newUserData.userChat.chatList];
    // }

    return newUserData;
}

export default userReducer;