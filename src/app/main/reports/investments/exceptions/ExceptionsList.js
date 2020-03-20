import React, { Component } from 'react';
import { Avatar, Switch, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '../../../../../@fuse';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import moment from 'moment';
import * as Actions from '../../store/actions';
import ExceptionsLists from './components/ExceptionsLists';
import _ from 'lodash';

class ExceptionsList extends Component {

    render() {
        const { exceptions, match } = this.props;

        return (
            <ExceptionsLists
                data={exceptions}
            />
        );
        
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ successInvestmentsApp }) {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExceptionsList));
