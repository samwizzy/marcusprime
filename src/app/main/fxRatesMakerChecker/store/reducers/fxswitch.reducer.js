import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    form: {},
    data: [],
    rate: {},
    mode: '',
    composeDialog: false
};

const fxswitchReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_FX_RATES:
            {
                return {
                    ...state,
                    data: action.payload,
                };
            }
        case Actions.GET_FX_RATE:
            {
                return {
                    ...state,
                    rate: action.payload,
                };
            }
        case Actions.GET_FX_RATE_BY_TYPE:
            {
                return {
                    ...state,
                    data: action.payload,
                };
            }
        case Actions.UPDATE_FX_RATE:
            {
                return {
                    ...state
                };
            }
        case Actions.OPEN_NEW_FX_RATE_DIALOG:
            {
                return {
                    ...state,
                    mode: action.mode,
                    composeDialog: action.status,
                    form: action.payload
                }
            }
        case Actions.CLOSE_NEW_FX_RATE_DIALOG:
            {
                return {
                    ...state,
                    mode: action.mode
                }
            }
        case Actions.OPEN_EDIT_FX_RATE_DIALOG:
            {
                return {
                    ...state,
                    rate: action.payload,
                    mode: action.mode,
                    composeDialog: action.status
                }
            }
        case Actions.CLOSE_EDIT_FX_RATE_DIALOG:
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
export default fxswitchReducer;
