import {combineReducers} from 'redux';
import customerServices from './customerServices.reducer';

const reducer = combineReducers({
    customerServices,
});

export default reducer;
