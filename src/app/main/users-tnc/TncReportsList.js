import React, { Component } from 'react';
import { Avatar, Switch, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate } from '../../../@fuse';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import moment from 'moment';
import * as Actions from '../../store/actions';
import TncReportsLists from './components/TncReportsLists';
import _ from 'lodash';

class TncReportsList extends Component {

    render() {
        const { match } = this.props;

        return (
            <TncReportsLists />
        );
        
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ tncReportsApp }) {
    return {
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TncReportsList));
