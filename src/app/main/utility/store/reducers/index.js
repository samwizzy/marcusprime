import {combineReducers} from 'redux';
import setting from './setting.reducer';
import department from './department.reducer';
import admins from './admins.reducer';

const reducer = combineReducers({
    setting,
    department,
    admins
});

export default reducer;
