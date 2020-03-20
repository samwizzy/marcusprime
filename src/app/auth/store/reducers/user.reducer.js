import * as Actions from '../actions';

const initialState = {
    data: {
        role: { name: 'guest' },
        'firstName': '',
        'lastName': 'guest',
        'userName': '',
        'photoURL'   : '', //assets/images/avatars/Velazquez.jpg
        'email'      : '',
    },
};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            console.log(action.payload, "SET USER DATA Reducer")
           
            localStorage.setItem('data', JSON.stringify(action.payload));
            return {
                ...state,
                ...action.payload,
                from : "auth2"
            };
        }
        case Actions.REMOVE_USER_DATA:
        {
            localStorage.removeItem('data');
            return {
                ...state
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

export default user;
