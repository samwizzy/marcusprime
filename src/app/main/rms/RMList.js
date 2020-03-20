import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import RMsList from './components/RMsList';
import _ from 'lodash';

class RMList extends Component {

    render() {
        const { allRms } = this.props;

        return (
            <RMsList
                data={allRms}
            />
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openNewRmDialog: Actions.openNewRmDialog,
    }, dispatch);
}

function mapStateToProps({ rmsApp }) {
    return {
        allRms: rmsApp.rms.allRms,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RMList));
