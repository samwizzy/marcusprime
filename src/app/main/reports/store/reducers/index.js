import {combineReducers} from 'redux';
import investments from './investments.reducer';
import financialGoals from './financialGoals.reducer';
import reports from './reports.reducer';
import fx from './fx.reducer';
import fdcd from './fdcd.reducer';
import endofday from './endofday.reducer';
import walletslog from './walletslog.reducer';
import paystacklog from './paystacklog.reducer';

const reducer = combineReducers({
    investments,
    financialGoals,
    reports,
    fx,
    fdcd,
    endofday,
    walletslog,
    paystacklog
});

export default reducer;
