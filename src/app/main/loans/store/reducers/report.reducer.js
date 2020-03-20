import * as Actions from '../actions';

const initialState = {
    loanReports: [],
    rateDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const loanReportReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_LOANS_REPORT:
            {
                return {
                    ...state,
                    loanReports: action.payload,
                };
            }
        default:
            {
                return state;
            }

    }
}
export default loanReportReducer;
