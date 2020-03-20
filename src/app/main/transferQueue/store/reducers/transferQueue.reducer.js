import * as Actions from '../actions';

const initialState = {
    transferQueue: [],
    bondsProduct: '',
    transferDialog: {
        type: 'approve',
        props: {
            open: false
        },
        data: null
    }
};

const transferQueueReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_TRANSFER_QUEUE:
            {
                return {
                    ...state,
                    transferQueue: action.payload,
                };
            }
        case Actions.OPEN_NEW_TRANSFER_QUEUE_DIALOG:
            {
                return {
                    ...state,
                    transferDialog: {
                        type: 'approve',
                        props: {
                            open: true
                        },
                        data: action.payload
                    }
                }
            }
        case Actions.CLOSE_NEW_TRANSFER_QUEUE_DIALOG:
            {
                return {
                    ...state,
                    transferDialog: {
                        type: 'new',
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
export default transferQueueReducer;
