import React, { Component } from 'react';
import { withStyles, Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../../app/store/withReducer';
import _ from 'lodash';
import InvestmentTypesList from './InvestmentTypesList';
import InvestmentsHeader from './InvestmentsHeader';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class InvestmentTypesApp extends Component {

    componentDidMount() {
        this.props.getAccounts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            // this.props.getAccounts(this.props.match.params);
            this.props.getAccounts();
        }
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
                    header={
                        <InvestmentsHeader pageLayout={() => this.pageLayout} />
                    }
                    content={
                        <InvestmentTypesList />
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
        getAccounts: Actions.getInvestmentTypes,
    }, dispatch);
}

    function mapStateToProps({ investmentTypesApp }) {
    return {
        selectedContactIds: investmentTypesApp.investmentTypes.selectedContactIds,
        searchText: investmentTypesApp.investmentTypes.searchText,
    }
}

export default withReducer('investmentTypesApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestmentTypesApp))));
