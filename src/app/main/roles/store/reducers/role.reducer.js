import * as Actions from '../actions';

const initialState = {
    form: {
        name: '',
        description: '',
        updatedBy: null,
        addedBy: null,
        createdBy: null,
        createdAt: null,
    }
};

const roleReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.NEW_ROLE:
        {
            return {
                ...state,
                data: action.payload,
                mode: action.mode
            };
        }
        case Actions.GET_ROLE:
        {
            return {
                ...state,
                data: action.payload,
                mode: action.mode
            };
        }
        case Actions.UPDATE_ROLE:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_ROLE:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.DELETE_ROLE:
        {
            console.log("You just hit delete role reducer")
            
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

export default roleReducer;
