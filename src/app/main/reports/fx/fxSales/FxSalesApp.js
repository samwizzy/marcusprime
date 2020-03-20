import React, { Component } from 'react';
import { withStyles, Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import _ from 'lodash';
import FxSalesList from './components/FxSaleList';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class FxSalesApp extends Component {

    componentDidMount() {
        this.props.getFxSales()
    }

    render() {

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar: "w-256 border-0",
                        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    content={
                        <FxSalesList />
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getFxSales: Actions.getFxSales,
    }, dispatch);
}

function mapStateToProps({ fxsalesApp }) {
    return { }
}

export default withReducer('fxsalesApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FxSalesApp))));
