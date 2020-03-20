import {combineReducers} from 'redux';
import fxswitch from './fxswitch.reducer';
import currency from './currency.reducer';

const reducer = combineReducers({
    fxswitch,
    currency
});

export default reducer;
