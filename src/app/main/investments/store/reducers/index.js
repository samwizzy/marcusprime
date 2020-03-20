import {combineReducers} from 'redux';
import investmentTypes from './investmentTypes.reducer';
import productCategories from './productCategories.reducer';
import tbills from './tbills.reducer';
import bonds from './bonds.reducer';

const reducer = combineReducers({
    investmentTypes,
    productCategories,
    tbills,
    bonds,
});

export default reducer;
