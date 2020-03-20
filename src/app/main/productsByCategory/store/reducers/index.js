import {combineReducers} from 'redux';
import productsByCategory from './productsByCategory.reducer';

const reducer = combineReducers({
    productsByCategory,
});

export default reducer;
