import React, { Component } from 'react';
import { withStyles, Fab, Icon, Link, Typography } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../../app/store/withReducer';
import _ from 'lodash';
import TbillsProductsList from './TbillsProductsList';
import TbillsProductsDialog from './TbillsProductsDialog';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import TbillsProductsView from './TbillsProductsView';


const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class TbillsProductsApp extends Component {

    componentDidMount() {
        const { getTbillsProduct } = this.props;

        // TODO: this is hard coded from backed to get all Tbills products by (1)
        getTbillsProduct(1);
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
                        <TbillsProductsList />
                    }
                />
                <TbillsProductsDialog />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTbillsProduct: Actions.getTbillsProduct,
    }, dispatch);
}

function mapStateToProps({ tbillsApp }) {
    return {}
}

export default withReducer('tbillsApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TbillsProductsApp))));
