import React, { Component } from 'react';
import { Avatar, Switch, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '../../../../../@fuse';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import moment from 'moment';
import * as Actions from '../../store/actions';
import FailedFinancialGoalList from './components/FailedFinancialGoalsList';
import _ from 'lodash';

class FailedFinancialGoalsList extends Component {

    render() {
        const { financialGoals } = this.props;

        return (
            <FailedFinancialGoalList
                data={financialGoals}
            />
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ failedFinancialGoalsApp }) {
    return {
        financialGoals: failedFinancialGoalsApp.financialGoals.financialGoals,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FailedFinancialGoalsList));
