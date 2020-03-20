import {combineReducers} from 'redux';
import doctypes from './doctypes.reducer';

const reducer = combineReducers({
    doctypes,
});

export default reducer;
