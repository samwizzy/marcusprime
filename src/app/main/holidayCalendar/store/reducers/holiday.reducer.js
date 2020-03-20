import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    form: {},
    data: [],
    holiday: {},
    mode: '',
    composeDialog: false
};

const holidayReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_HOLIDAYS:
            {
                return {
                    ...state,
                    data: action.payload,
                };
            }
        case Actions.GET_HOLIDAY:
            {
                return {
                    ...state,
                    holiday: action.payload,
                };
            }
        case Actions.UPDATE_HOLIDAY:
            {
                return {
                    ...state
                };
            }
        case Actions.OPEN_NEW_HOLIDAY_DIALOG:
            {
                return {
                    ...state,
                    mode: action.mode,
                    composeDialog: action.status,
                    form: action.payload
                }
            }
        case Actions.CLOSE_NEW_HOLIDAY_DIALOG:
            {
                return {
                    ...state,
                    mode: action.mode
                }
            }
        case Actions.OPEN_EDIT_HOLIDAY_DIALOG:
            {
                return {
                    ...state,
                    holiday: action.payload,
                    mode: action.mode,
                    composeDialog: action.status
                }
            }
        case Actions.CLOSE_EDIT_HOLIDAY_DIALOG:
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
export default holidayReducer;
