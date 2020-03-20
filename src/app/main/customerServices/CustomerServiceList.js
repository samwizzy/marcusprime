import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import RMsList from './components/CustomerServicesList';
import _ from 'lodash';

class CustomerServiceList extends Component {

    render() {
        const { allCS } = this.props;

        return (
            <RMsList
                data={allCS}
            />
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openNewRmDialog: Actions.openNewRmDialog,
    }, dispatch);
}

function mapStateToProps({ customerServicesApp }) {
    return {
        allCS: customerServicesApp.customerServices.allCS,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerServiceList));
