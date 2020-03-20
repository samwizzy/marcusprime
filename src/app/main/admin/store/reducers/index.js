import {combineReducers} from 'redux';
import admins from './admins.reducer';
import admin from './admin.reducer';
import departments from './departments.reducer';

const reducer = combineReducers({
    admins,
    admin,
    departments
});

export default reducer;
