import * as Actions from '../actions';

const initialState = [];

const departmentsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_DEPARTMENTS:
        {
            return [
                ...action.payload
            ];
        }
        default:
        {
            return state;
        }
    }
};

export default departmentsReducer;
