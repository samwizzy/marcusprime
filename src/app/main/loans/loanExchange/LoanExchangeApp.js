import React, { Component } from 'react';
import { withStyles, Fab, Icon, Typography, Link } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../store/withReducer';
import _ from 'lodash';
// import ExchangeRatesList from './LoanExchangeList';
import ExchangeRatesDialog from './LoanExchangeDialog';
import ExchangeRateList from './components/LoanExchangeList';
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

class LoanExchangeApp extends Component {

    componentDidMount() {
        const { getCurrencies } = this.props;

        // TODO: this is hard coded from backed to get all investment with key (0)
        getCurrencies();
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
                        leftSidebar: "w-256 border-0",
                        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    // header={
                    //     <div className="flex flex-1 items-center justify-between p-24">
                    //         <div className="flex flex-col">
                    //             <div className="flex items-center mb-16">
                    //                 <Link color="inherit" onClick={() => this.handleLink('/apps/dashboards/analytics')}>
                    //                     <Icon className="text-18" color="action">home</Icon>
                    //                 </Link>
                    //                 <Icon className="text-16" color="action">chevron_right</Icon>
                    //                 <Typography color="textSecondary">Loan Exchange Rate</Typography>
                    //             </div>
                    //             <Typography variant="h6">Loan Exchange Rate</Typography>
                    //         </div>
                    //     </div>
                    // }
                    content={
                        <ExchangeRateList />
                    }
                />
                <ExchangeRatesDialog />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCurrencies: Actions.getCurrencies,
    }, dispatch);
}

function mapStateToProps({ loanExchangeRatesApp }) {
    return {    }
}

export default withReducer('loanExchangeRatesApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoanExchangeApp))));
