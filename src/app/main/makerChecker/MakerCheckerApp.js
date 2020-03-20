import React, { Component } from 'react';
import { withStyles, Fab, Icon, Link, Typography } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../app/store/withReducer';
import _ from 'lodash';
import MakerCheckerList from './MakerCheckerList';
import MakerCheckerDialog from './MakerCheckerDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class MakerChecker extends Component {

    componentDidMount() {
        const { getAllTempProducts } = this.props;

        getAllTempProducts();
    }

    handleLink = link => {
        this.props.history.push(link);
    }

    render() {

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                    }}
                    content={
                        <MakerCheckerList />
                    }
                />
                <MakerCheckerDialog />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllTempProducts: Actions.getAllTempProducts,
    }, dispatch);
}

function mapStateToProps({ makerApp }) {
    return {}
}

export default withReducer('makerApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(MakerChecker))));
