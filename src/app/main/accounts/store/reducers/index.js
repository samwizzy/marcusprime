import {combineReducers} from 'redux';
import accounts from './accounts.reducer';

const reducer = combineReducers({
    accounts,
});

export default reducer;
