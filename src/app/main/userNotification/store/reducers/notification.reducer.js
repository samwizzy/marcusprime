import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    form: {},
    data: [],
    notification: {}
};

const notificationReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SAVE_EMAIL:
            {
                return {
                    ...state
                };
            }
        case Actions.SAVE_SMS:
            {
                return {
                    ...state
                }
            }
        case Actions.SAVE_PUSH_NOTIFICATION:
            {
                return {
                    ...state
                }
            }
        default:
            return state;

    }
}
export default notificationReducer;
