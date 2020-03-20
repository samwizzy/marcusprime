import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import AllInvestmentList from './components/AllInvestmentList';
import BondsList from './components/BondsList';
import TBillsList from './components/TBillsList';
import _ from 'lodash';

class ContactsList extends Component {

    render() {
        const { investments, match } = this.props;

        let Tbills = _.filter(investments, item => item.name === "Treasury Bills");
        let Bonds = _.filter(investments, item => item.name === "Bonds");

        if (match.params.id === '1') {
            return (
                <TBillsList
                    data={Tbills}
                />
            );
        } else if (match.params.id === '2') {
            return (
                <BondsList
                    data={Bonds}
                />
            );
        } else {
            return (
                <AllInvestmentList
                    data={investments}
                />
            );
        }
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ allInvestmentsApp }) {
    return {
        investments: allInvestmentsApp.investments.investments,
        products: allInvestmentsApp.investments.products,
        productsByCategory: allInvestmentsApp.investments.productsByCategory,
        contacts: allInvestmentsApp.investments.entities,
        selectedContactIds: allInvestmentsApp.investments.selectedContactIds,
        searchText: allInvestmentsApp.investments.searchText,
        user: allInvestmentsApp.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactsList));
