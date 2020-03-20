import React, { Component } from 'react';
import { withStyles, Fab, Icon, Typography, Link } from '@material-ui/core';
import { FusePageSimple, FuseAnimate, FusePageCarded } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../store/withReducer';
import _ from 'lodash';
import TbillsProductsList from './PendingProductsList';
import TbillsProductsDialog from './TbillsProductsDialog';
import BondsProductsDialog from './BondsProductsDialog';
import BondsMaturityUploadDialog from './BondsMaturityUploadDialog';
import TbillsMaturityUploadDialog from './TbillsMaturityUploadDialog';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import TbillsProductsView from './PendingProductsView';
import ConfirmDialog from './ConfirmDialog';


const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class PendingProductsApp extends Component {


    handleLink = link => {
        this.props.history.push(link);
    }

    render() {

        return (
            <React.Fragment>
                <FusePageCarded
                    header={
                        <div className="flex flex-1 items-center justify-between p-24">
                            <div className="flex flex-col">
                                <div className="flex items-center mb-16">
                                    <Link color="inherit" onClick={evt => this.handleLink('/apps/dashboards/analytics')}>
                                        <Icon className="text-18" color="action">home</Icon>
                                    </Link>
                                    <Icon className="text-16" color="action">chevron_right</Icon>
                                    <Typography color="textSecondary">Products</Typography>
                                </div>
                                <Typography variant="h6">Products</Typography>
                            </div>
                        </div>
                    }
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar: "w-256 border-0",
                        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    content={
                        // <TbillsProductsList />
                        <TbillsProductsView />
                    }
                />
                <TbillsProductsDialog />
                <BondsProductsDialog />
                <BondsMaturityUploadDialog />
                <TbillsMaturityUploadDialog />
                {/* <ConfirmDialog /> */}
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({ pendingProductsApp }) {
    return {}
}

export default withReducer('pendingProductsApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingProductsApp))));
