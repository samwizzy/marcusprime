import {combineReducers} from 'redux';
import role from './role.reducer';
import roles from './roles.reducer';
import rights from './rights.reducer';

const reducer = combineReducers({
    roles,
    role,
    rights
});

export default reducer;
