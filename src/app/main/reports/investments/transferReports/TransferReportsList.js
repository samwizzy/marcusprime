import React, { Component } from 'react';
import { Avatar, Switch, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '../../../../../@fuse';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import moment from 'moment';
import * as Actions from '../../store/actions';
import TransferReportsLists from './components/TransferReportsLists';
import _ from 'lodash';

class TransferReportsList extends Component {

    render() {
        const { exceptions, match } = this.props;

        return (
            <TransferReportsLists
                data={exceptions}
            />
        );
        
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ transferReportsApp }) {
    return {
        // investments: successInvestmentsApp.investments.investments,
        // products: successInvestmentsApp.investments.products,
        // productsByCategory: successInvestmentsApp.investments.productsByCategory,
        // contacts: successInvestmentsApp.investments.entities,
        // selectedContactIds: successInvestmentsApp.investments.selectedContactIds,
        // searchText: successInvestmentsApp.investments.searchText,
        // user: successInvestmentsApp.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransferReportsList));
