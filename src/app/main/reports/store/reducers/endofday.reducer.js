import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    data: [],
    filteredData: [],
    isFiltering: false,
    isLoading: false,
    searchText: ''
};

const endofdayReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_END_OF_DAYS:
        {
            return {
                ...state,
                data: action.payload,
            };
        }
        case Actions.GET_END_OF_DAY_BY_CURRENCY:
        {
            return {
                ...state,
                data: action.payload,
            };
        }
        case Actions.GET_END_OF_DAY_CREATED_DATE:
        {
            return {
                ...state,
                data: action.payload,
            };
        }
        case Actions.GET_END_OF_DAY_CREATED_DATE_AND_CURRENCY:
        {
            return {
                ...state,
                data: action.payload,
            };
        }
        case Actions.GET_END_OF_DAYS_BY_DATE_LOADING:
        {
            return {
                ...state,
                isLoading: true,
            };
        }
        case Actions.GET_END_OF_DAYS_BY_DATE:
        {
            return {
                ...state,
                isFiltering: true,
                isLoading: false,
                filteredData: action.payload,
            };
        }
        default:
        {
            return state;
        }
    }
};

export default endofdayReducer;
