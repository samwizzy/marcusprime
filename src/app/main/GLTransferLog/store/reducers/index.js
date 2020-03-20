import {combineReducers} from 'redux';
import transferLog from './transferLog.reducer';

const reducer = combineReducers({
    transferLog,
});

export default reducer;
