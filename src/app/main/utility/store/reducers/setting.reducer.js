import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    form: {
        loanNotificationDepts: [],
        ptaNotificationDepts: []
    },
    data: [],
    setting: {},
    mode: '',
    composeDialog: false
};

const settingReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_SETTINGS:
            {
                return {
                    ...state,
                    data: action.payload,
                };
            }
        case Actions.GET_SETTING:
            {
                return {
                    ...state,
                    setting: action.payload,
                };
            }
        case Actions.UPDATE_SETTING:
            {
                return {
                    ...state
                };
            }
        case Actions.OPEN_NEW_SETTING_DIALOG:
            {
                return {
                    ...state,
                    mode: action.mode,
                    composeDialog: action.status,
                    form: action.payload
                }
            }
        case Actions.CLOSE_NEW_SETTING_DIALOG:
            {
                return {
                    ...state,
                    mode: action.mode
                }
            }
        case Actions.OPEN_EDIT_SETTING_DIALOG:
            {
                return {
                    ...state,
                    setting: action.payload,
                    mode: action.mode,
                    composeDialog: action.status
                }
            }
        case Actions.CLOSE_EDIT_SETTING_DIALOG:
            {
                return {
                    ...state,
                    composeDialog: action.status
                }
            }
        default:
            return state;

    }
}
export default settingReducer;
