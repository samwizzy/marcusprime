import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    tempProducts: [],
    bondsProduct: '',
    makerDialog: {
        type: 'approve',
        props: {
            open: false
        },
        data: null
    }
};

const makerReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_TEMP_PRODUCTS:
            {
                return {
                    ...state,
                    tempProducts: action.payload,
                };
            }
        case Actions.OPEN_NEW_MAKER_DIALOG:
            {
                if(action.payload.status === 1){
                    return {
                        ...state,
                        makerDialog: {
                            type: 'approve',
                            props: {
                                open: true
                            },
                            data: action.payload
                        }
                    }
                } else {
                    return {
                        ...state,
                        makerDialog: {
                            type: 'decline',
                            props: {
                                open: true
                            },
                            data: action.payload
                        }
                    }
                }
            }
        case Actions.CLOSE_NEW_MAKER_DIALOG:
            {
                return {
                    ...state,
                    makerDialog: {
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
export default makerReducer;
