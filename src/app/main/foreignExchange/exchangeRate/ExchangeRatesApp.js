import React, { Component } from 'react';
import { withStyles, Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../../app/store/withReducer';
import _ from 'lodash';
import ExchangeRatesList from './ExchangeRatesList';
import ExchangeRatesDialog from './ExchangeRatesDialog';
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

class ExchangeRatesApp extends Component {

    componentDidMount() {
        const { getCurrencies } = this.props;

        // TODO: this is hard coded from backed to get all investment with key (0)
        getCurrencies();
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
                        <ExchangeRatesList />
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

function mapStateToProps({ exchangeRatesApp }) {
    return {    }
}

export default withReducer('exchangeRatesApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ExchangeRatesApp))));
