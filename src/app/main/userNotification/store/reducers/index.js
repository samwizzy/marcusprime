import {combineReducers} from 'redux';
import holiday from './notification.reducer';
import customers from './customers.reducer';

const reducer = combineReducers({
    holiday,
    customers
});

export default reducer;
