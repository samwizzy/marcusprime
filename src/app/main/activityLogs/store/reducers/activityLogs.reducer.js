import * as Actions from '../actions';

const initialState = {
    allActivitiesLog: [],
};

const makerReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_ACTIVITY_LOGS:
            {
                return {
                    ...state,
                    allActivitiesLog: action.payload,
                };
            }
        default:
            {
                return state;
            }

    }
}
export default makerReducer;
