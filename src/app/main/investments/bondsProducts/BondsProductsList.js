import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import BondsProductList from './components/BondsProductList';

class BondsProductsList extends Component {

    render() {
        const { bondsProducts } = this.props;

        return (
            <BondsProductList
                data={bondsProducts}
            />
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openNewBondsDialog: Actions.openNewBondsDialog,
    }, dispatch);
}

function mapStateToProps({ bondsApp }) {
    return {
        bondsProducts: bondsApp.bonds.bondsProducts,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BondsProductsList));
