import {combineReducers} from 'redux';
import maturity from './maturity.reducer';

const reducer = combineReducers({
    maturity,
});

export default reducer;
