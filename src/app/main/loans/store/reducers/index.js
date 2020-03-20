import {combineReducers} from 'redux';
import rate from './rate.reducer';
import report from './report.reducer';

const reducer = combineReducers({
    rate,
    report,
});

export default reducer;
