import {combineReducers} from 'redux';
import mails from './mails.reducer';
import admin from './admin.reducer';
import labels from './labels.reducer';
import roles from './roles.reducer';
import role from './role.reducer';

const reducer = combineReducers({
    mails,
    admin,
    labels,
    roles,
    role,
});

export default reducer;
