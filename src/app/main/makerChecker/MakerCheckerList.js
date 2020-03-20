import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import MakerCheckerLists from './components/MakerCheckerList';
import _ from 'lodash';

class MakerCheckerList extends Component {

    render() {
        const { tempProducts } = this.props;

        return (
            <MakerCheckerLists
                data={tempProducts}
            />
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openMakerDialog: Actions.openMakerDialog,
    }, dispatch);
}

function mapStateToProps({ makerApp }) {
    return {
        tempProducts: makerApp.maker.tempProducts,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MakerCheckerList));
