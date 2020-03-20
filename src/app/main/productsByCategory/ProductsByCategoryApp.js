import React, { Component } from 'react';
import { withStyles, Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../app/store/withReducer';
import _ from 'lodash';
import ProductsByCategoryList from './ProductsByCategoryList';
import ProductsByCategoryHeader from './ProductsByCategoryHeader';
import ProductsByCategoryDialog from './ProductsByCategoryDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import axios from 'axios';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class ProductsByCategoryApp extends Component {

    componentDidMount() {
        this.props.getProductsByCategory();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            // this.props.getAccounts(this.props.match.params);
            this.props.getProductsByCategory();
        }
    }

    render() {
        const { classes, openNewContactDialog } = this.props;

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar: "w-256 border-0",
                        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <ProductsByCategoryHeader pageLayout={() => this.pageLayout} />
                    }
                    content={
                        <ProductsByCategoryList />
                    }
                    // leftSidebarContent={
                    //     <ContactsSidebarContent/>
                    // }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                {/* <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={openNewContactDialog}
                    >
                        <Icon>person_add</Icon>
                    </Fab>
                </FuseAnimate> */}
                {/* <ProductsByCategoryDialog/> */}
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getProductsByCategory: Actions.getProductsByCategory,
        openNewContactDialog: Actions.openNewContactDialog
    }, dispatch);
}

    function mapStateToProps({ productsByCategoryApp }) {
    return {
        contacts: productsByCategoryApp.productCategories.entities,
        selectedContactIds: productsByCategoryApp.productCategories.selectedContactIds,
        searchText: productsByCategoryApp.productCategories.searchText,
        user: productsByCategoryApp.user
    }
}

export default withReducer('productsByCategoryApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsByCategoryApp))));
