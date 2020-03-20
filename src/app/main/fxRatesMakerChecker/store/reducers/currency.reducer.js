import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    data: []
};

const currencyReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_CURRENCIES:
            {
                return {
                    ...state,
                    data: action.payload,
                };
            }
        default:
            return state;

    }
}
export default currencyReducer;
