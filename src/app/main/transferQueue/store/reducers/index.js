import {combineReducers} from 'redux';
import transferQueue from './transferQueue.reducer';

const reducer = combineReducers({
    transferQueue,
});

export default reducer;
