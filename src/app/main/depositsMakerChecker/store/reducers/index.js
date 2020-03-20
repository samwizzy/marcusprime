import {combineReducers} from 'redux';
import deposits from './deposits.reducer';
import currency from './currency.reducer';

const reducer = combineReducers({
    deposits,
    currency
});

export default reducer;
