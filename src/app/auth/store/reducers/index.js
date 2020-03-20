import {combineReducers} from 'redux';
import user from './user.reducer';
import login from './login.reducer';
import register from './register.reducer';
import rights from './rights.reducer';
import roles from './roles.reducer';

const authReducers = combineReducers({
    user,
    login,
    register,
    rights,
    roles
});

export default authReducers;