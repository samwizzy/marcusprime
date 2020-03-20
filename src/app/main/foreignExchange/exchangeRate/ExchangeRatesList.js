import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import ExchangeRateList from './components/ExchangeRateList';
import _ from 'lodash';

class ExchangeRatesList extends Component {

    render() {
        const { currencies } = this.props;

        return (
            <ExchangeRateList
                data={currencies}
            />
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        
    }, dispatch);
}

function mapStateToProps({ exchangeRatesApp }) {
    return {
        currencies: exchangeRatesApp.rate.currencies,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExchangeRatesList));
