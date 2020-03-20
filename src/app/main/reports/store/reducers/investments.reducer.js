import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    productCategories  : [],    
    investments        : [],
    filteredInvestments  : [],
    investmentsStatus  : [],
    isFiltering: false,
};

const investmentsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PRODUCT_CATEGORIES:
        {
            return {
                ...state,
                productCategories   : action.payload,
            };
        }
        case Actions.GET_INVESTMENTS:
        {
            return {
                ...state,
                investments   : action.payload,
            };
        }
        case Actions.GET_INVESTMENTS_STATUS:
        {
            return {
                ...state,
                investmentsStatus   : action.payload,
            };
        }
        case Actions.GET_INVESTMENTS_BY_DATE:
        {
            return {
                ...state,
                filteredInvestments   : action.payload,
                isFiltering: true
            };
        }
        default:
        {
            return state;
        }
    }
};

export default investmentsReducer;
