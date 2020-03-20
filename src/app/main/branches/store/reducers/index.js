import {combineReducers} from 'redux';
import branch from './branch.reducer';

const reducer = combineReducers({
    branch,
});

export default reducer;
