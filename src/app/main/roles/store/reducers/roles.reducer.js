import * as Actions from '../actions';

const initialState = {
    form: {
        name : '',
        email: '',
        roles : []
    }
};

const rolesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ROLES:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SET_ROLES_BY_ID:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        default:
        {
            return state;
        }
    }
};

export default rolesReducer;
