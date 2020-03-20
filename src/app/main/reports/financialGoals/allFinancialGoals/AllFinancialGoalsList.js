import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../../store/actions';
import FinancialGoalsList from './components/AllFinancialGoalsList';
// import BondsList from './components/BondsList';
// import TBillsList from './components/TBillsList';
import _ from 'lodash';

class AllFinancialGoalsList extends Component {

    render() {
        const { financialGoals } = this.props;

        // let Tbills = _.filter(investments, item => item.product.productCategory.name === "Treasury Bills");
        // let Bonds = _.filter(investments, item => item.product.productCategory.name === "Bonds");

        // if (match.params.id === '1') {
        //     return (
        //         <TBillsList
        //             data={Tbills}
        //         />
        //     );
        // } else if (match.params.id === '2') {
        //     return (
        //         <BondsList
        //             data={Bonds}
        //         />
        //     );
        // } else {
            return (
                <FinancialGoalsList
                    data={financialGoals}
                />
            );
        // }
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ allFinancialGoalsApp }) {
    return {
        financialGoals: allFinancialGoalsApp.financialGoals.financialGoals,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllFinancialGoalsList));
