import {combineReducers} from 'redux';
import pta from './pta.reducer';
import branch from './branch.reducer';

import files from './files.reducer';
import selectedItem from './selectedItem.reducer';

const reducer = combineReducers({
    branch,
    pta,
    files,
    selectedItem
});

export default reducer;
