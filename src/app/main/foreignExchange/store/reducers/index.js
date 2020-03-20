import {combineReducers} from 'redux';
import rate from './rate.reducer';
import fxswitch from './fxswitch.reducer';

const reducer = combineReducers({
    rate,
    fxswitch
});

export default reducer;
