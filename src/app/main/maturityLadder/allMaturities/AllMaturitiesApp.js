import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { FusePageSimple } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../../app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import AllMaturitiesView from './AllMaturitiesView';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class AllMaturitiesApp extends Component {

    componentDidMount() {
        const { getAllMaturities } = this.props;
        getAllMaturities();
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
                        <AllMaturitiesView />
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
        getAllMaturities: Actions.getAllMaturities,
    }, dispatch);
}

function mapStateToProps({ maturitiesApp }) {
    return {
        maturities: maturitiesApp.maturity.maturities,
    }
}

export default withReducer('maturitiesApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(AllMaturitiesApp))));
