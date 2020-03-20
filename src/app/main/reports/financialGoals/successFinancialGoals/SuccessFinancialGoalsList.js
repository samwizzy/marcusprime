import React, { Component } from 'react';
import { Avatar, Switch, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '@fuse';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import moment from 'moment';
import * as Actions from '../../store/actions';
import SuccessFinancialGoalList from './components/SuccessFinancialGoalsList';
import _ from '@lodash';

class SuccessFinancialGoalsList extends Component {

    render() {
        const { financialGoals, match } = this.props;

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
                <SuccessFinancialGoalList
                    data={financialGoals}
                />
            );
        // }
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ successFinancialGoalsApp }) {
    return {
        financialGoals: successFinancialGoalsApp.financialGoals.financialGoals,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SuccessFinancialGoalsList));
