import * as Actions from '../actions';

const initialState = {
    data: [],
    log: {},
    bondsProduct: '',
    transferDialog: {
        type: 'approve',
        props: {
            open: false
        }
    }
};

const transferLogReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_GL_TRANSFER_LOGS:
            {
                return {
                    ...state,
                    data: action.payload,
                };
            }
        case Actions.GET_GL_TRANSFER_LOG_BY_DATE:
            {
                return {
                    ...state,
                    data: action.payload,
                };
            }
        case Actions.GET_GL_TRANSFER_LOG:
            {
                return {
                    ...state,
                    log: action.payload,
                };
            }
        case Actions.OPEN_NEW_TRANSFER_LOG_DIALOG:
            {
                return {
                    ...state,
                    log: action.payload,
                    transferDialog: {
                        type: 'approve',
                        props: {
                            open: true
                        }
                    }
                }
            }
        case Actions.CLOSE_NEW_TRANSFER_LOG_DIALOG:
            {
                return {
                    ...state,
                    transferDialog: {
                        type: 'new',
                        props: {
                            open: false
                        }
                    }
                }
            }
        default:
            {
                return state;
            }

    }
}
export default transferLogReducer;
