import * as Actions from '../actions';

const initialState = {
    data: [],
    department: {},
    mode: '',
    form: {}
}

const departmentReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_DEPARTMENTS:
            return {
                ...state,
                data: action.payload
            }
        case Actions.GET_DEPARTMENT:
            return {
                ...state,
                department: action.payload,
                mode: action.mode
            }
        case Actions.NEW_DEPARTMENT:
            return {
                ...state,
                form: action.payload,
                mode: action.mode
            }
        case Actions.UPDATE_DEPARTMENT:
            return {
                ...state,
                department: action.payload,
            }
        default:
            return state;
    }
};

export default departmentReducer;
