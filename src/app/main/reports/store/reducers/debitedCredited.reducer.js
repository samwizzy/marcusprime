import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    data: [],
    searchText: ''
};

const debitedCreditedReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PAYSTACK_LOGS:
        {
            return {
                ...state,
                data: action.payload,
            };
        }
        case Actions.GET_PAYSTACK_LOGS_BY_DATE:
        {
            return {
                ...state,
                data: action.payload,
            };
        }
        default:
        {
            return state;
        }
    }
};

export default debitedCreditedReducer;
