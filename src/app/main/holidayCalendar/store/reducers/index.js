import {combineReducers} from 'redux';
import holiday from './holiday.reducer';

const reducer = combineReducers({
    holiday,
});

export default reducer;
