import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    financialGoals        : [],
    filteredFinancialGoals  : [],
};

const financialGoalsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_FINANCIAL_GOALS:
        {
            return {
                ...state,
                financialGoals   : action.payload,
            };
        }
        default:
        {
            return state;
        }
    }
};

export default financialGoalsReducer;
