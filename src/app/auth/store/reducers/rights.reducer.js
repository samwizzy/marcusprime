import * as Actions from '../actions';

const initialState = {
    data: [],
    right: {},
    rights: [],
    authRoles: ['guest']
};

const rightsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ROLE_RIGHTS:
        {
            return {
                ...state,
                rights: action.payload
            };
        }
        case Actions.GET_ROLE_RIGHT:
        {
            return {
                ...state,
                right: action.payload
            };
        }
        case Actions.GET_AUTH_ROLES:
        {
            const { role } = action.payload
            return {
                ...state,
                authRoles: role? [role.name] : ['guest']
            };
        }
        default:
        {
            return state;
        }
    }
};

export default rightsReducer;
