import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    data: [],
    filteredData: [],
    isFiltering: false,
    searchText: ''
};

const fdcdReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_FIXED_DEPOSIT:
        {
            return {
                ...state,
                data: action.payload,
            };
        }
        case Actions.GET_CALL_DEPOSIT:
        {
            return {
                ...state,
                data: action.payload,
            };
        }
        case Actions.GET_FIXED_DEPOSIT_BY_DATE:
        {
            return {
                ...state,
                filteredData: action.payload,
                isFiltering: true
            };
        }
        case Actions.GET_CALL_DEPOSIT:
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

export default fdcdReducer;
