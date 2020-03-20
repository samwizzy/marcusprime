import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    form: {
        id: '',
        currency: '',
        minAmount: '',
        maxAmount: '',
        rate: '',
        tenor: '',
    },
    data: [],
    rate: {},
    mode: '',
    composeDialog: false
};

const depositsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_DEPOSIT_RATES:
            {
                return {
                    ...state,
                    data: action.payload,
                };
            }
        case Actions.GET_DEPOSIT_RATE:
            {
                return {
                    ...state,
                    rate: action.payload,
                };
            }
        case Actions.SAVE_DEPOSIT_RATE:
            {
                return {
                    ...state,
                    rate: action.payload
                };
            }
        case Actions.UPDATE_DEPOSIT_RATE:
            {
                return {
                    ...state
                };
            }
        case Actions.OPEN_NEW_DEPOSIT_DIALOG:
            {
                return {
                    ...state,
                    mode: action.mode,
                    composeDialog: action.status,
                    form: action.payload
                }
            }
        case Actions.CLOSE_NEW_DEPOSIT_DIALOG:
            {
                return {
                    ...state,
                    mode: action.mode
                }
            }
        case Actions.OPEN_EDIT_DEPOSIT_DIALOG:
            {
                return {
                    ...state,
                    rate: action.payload,
                    mode: action.mode,
                    composeDialog: action.status
                }
            }
        case Actions.CLOSE_EDIT_DEPOSIT_DIALOG:
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
export default depositsReducer;
