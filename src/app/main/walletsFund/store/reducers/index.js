import {combineReducers} from 'redux';
import walletFund from './walletFund.reducer';
import users from './users.reducer';

const reducer = combineReducers({
    walletFund,
    users,
});

export default reducer;
