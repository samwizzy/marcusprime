import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { FusePageSimple } from '../../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../../../app/store/withReducer';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';
import SuccessInvestmentsView from './SuccessInvestmentsView';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class SuccessInvestmentsApp extends Component {

    componentDidMount() {
        const { getProductCategories, getInvestmentsStatus } = this.props;
        getProductCategories();

        // TODO: this is hard coded from backed to get all investment with key (0, 1, 2)
        // TODO: 0 => all investments, 1 => all successful investments, 2 => all unsuccessful investments
        getInvestmentsStatus(1);
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
                        <SuccessInvestmentsView />
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
        getInvestmentsStatus: Actions.getInvestmentsStatus,
        getProductCategories: Actions.getProductCategories,
    }, dispatch);
}

function mapStateToProps({ successInvestmentsApp }) {
    return {
        productCategories: successInvestmentsApp.investments.productCategories,
        productsByCategory: successInvestmentsApp.investments.productCategories,
    }
}

export default withReducer('successInvestmentsApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(SuccessInvestmentsApp))));
