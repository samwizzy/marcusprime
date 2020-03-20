import * as Actions from '../actions';

const initialState = {
    data: [],
    form: {
        name : '',
        email: '',
        roles : []
    }
};

const branchReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_BRANCHES:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_BRANCH_BY_BSM:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.APPROVE_BRANCH:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        
        default:
        {
            return state;
        }
    }
};

export default branchReducer;
