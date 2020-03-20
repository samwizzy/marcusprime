import React, { Component } from 'react';
import { withStyles, Fab, Icon, Link, Typography } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../../app/store/withReducer';
import _ from 'lodash';
import BondsProductsList from './BondsProductsList';
import BondsProductsDialog from './BondsProductsDialog';
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

class BondsProductsApp extends Component {

    componentDidMount() {
        const { getBondsProduct } = this.props;

        // TODO: this is hard coded from backed to get all investment with key (0)
        // getTbillsProduct(0);
        getBondsProduct(2);
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
                    content={
                        <BondsProductsList />
                    }
                />
                <BondsProductsDialog />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBondsProduct: Actions.getBondsProduct,
    }, dispatch);
}

function mapStateToProps({ bondsApp }) {
    return {}
}

export default withReducer('bondsApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(BondsProductsApp))));
