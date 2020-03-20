import * as Actions from '../actions';

const initialState = {
    data: [],
    right: [],
    rights: [],
    composeDialog: false,
    form: {}
};

const rightsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MODULES:
        {
            return {
                ...state,
                data: action.payload
            };
        }
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
        case Actions.SAVE_ROLE_RIGHT:
        {
            return {
                ...state,
                right: action.payload
            };
        }
        case Actions.UPDATE_ROLE_RIGHT:
        {
            return {
                ...state,
                right: action.payload
            };
        }
        case Actions.DELETE_ROLE_RIGHT:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.OPEN_NEW_RIGHT_DIALOG:
        {
            return {
                ...state,
                composeDialog: action.payload.status,
                form: action.payload.data
            };
        }
        case Actions.CLOSE_NEW_RIGHT_DIALOG:
        {
            return {
                ...state,
                composeDialog: action.payload.status
            };
        }
        default:
        {
            return state;
        }
    }
};

export default rightsReducer;
