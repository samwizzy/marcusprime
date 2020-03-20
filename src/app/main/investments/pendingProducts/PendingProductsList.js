import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import TbillsProductList from './components/TbillsProductList';
import _ from 'lodash';

class PendingProductsList extends Component {

    render() {
        const { tbillsProducts } = this.props;

        return (
            <TbillsProductList
                data={tbillsProducts}
            />
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        
    }, dispatch);
}

function mapStateToProps({ tbillsApp }) {
    return {
        tbillsProducts: tbillsApp.tbills.tbillsProducts,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingProductsList));
