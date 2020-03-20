import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    data: [],
    selectedCustomers: []
};

const customersReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_CUSTOMERS:
            {
                return {
                    ...state,
                    data: action.payload,
                };
            }
        case Actions.GET_ALL_GROUP:
            {
                return {
                    ...state,
                    selectedCustomers: action.payload,
                };
            }
        case Actions.GET_USER_BY_GROUP:
            {
                return {
                    ...state,
                    selectedCustomers: action.payload,
                };
            }
        default:
            return state;

    }
}
export default customersReducer;
