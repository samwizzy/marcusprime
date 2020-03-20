import * as Actions from '../actions';
import _ from  'lodash';

const initialState = {
    maturities        : [],
    investmentsByMaturity  : [],
};

const maturitiesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MATURITIES:
        {
            return {
                ...state,
                maturities   : _.orderBy(action.payload, ['createdAt'], ['desc']),
            };
        }
        case Actions.GET_INVESTMENTS_BY_MATURITY:
        {
            return {
                ...state,
                investmentsByMaturity   : action.payload,
            };
        }
        default:
        {
            return state;
        }
    }
};

export default maturitiesReducer;
