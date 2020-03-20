import React, { Component } from 'react';
import { withStyles, Fab, Icon, Typography, Link } from '@material-ui/core';
import { FusePageSimple, FuseAnimate, FusePageCarded } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../store/withReducer';
import _ from 'lodash';
// import ExchangeRatesList from './LoanExchangeList';
import ExchangeRatesDialog from './LoanExchangeReportDialog';
import LoanExchangeReportView from './LoanExchangeReportView';
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

class LoanExchangeReportApp extends Component {

    handleLink = link => {
        this.props.history.push(link);
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
                        <LoanExchangeReportView />
                    }
                />
                <ExchangeRatesDialog />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({ loanExchangeRatesApp }) {
    return {    }
}

export default withReducer('loanExchangeRatesApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoanExchangeReportApp))));
