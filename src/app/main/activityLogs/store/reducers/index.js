import {combineReducers} from 'redux';
import activityLogs from './activityLogs.reducer';

const reducer = combineReducers({
    activityLogs,
});

export default reducer;
