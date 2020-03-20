import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    currencies: [],
    rateDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const ptaReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_RATE:
            {
                return {
                    ...state,
                    currencies: action.payload? action.payload : [],
                };
            }
        case Actions.OPEN_NEW_RATE_DIALOG:
            {
                return {
                    ...state,
                    rateDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                }
            }
        case Actions.CLOSE_NEW_RATE_DIALOG:
            {
                return {
                    ...state,
                    rateDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                }
            }
        case Actions.OPEN_EDIT_RATE_DIALOG:
            {
                console.log(action.data, 'action.data get by 1 data');
                return {
                    ...state,
                    rateDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                }
            }
        case Actions.CLOSE_EDIT_RATE_DIALOG:
            {
                return {
                    ...state,
                    rateDialog: {
                        type: 'edit',
                        props: {
                            open: false
                        },
                        data: null
                    }
                }
            }
        default:
            {
                return state;
            }

    }
}
export default ptaReducer;
