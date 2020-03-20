import React, { Component } from 'react';
import { withStyles, Tab, Tabs, Icon, Typography, Link } from '@material-ui/core';
import { FusePageCarded, FusePageSimple } from '../../../../@fuse';
import { orange } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import withReducer from '../../../store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import TbillsProductList from './components/TbillsProductList';
import BondsProductList from './components/BondsProductList';


const styles = theme => ({
    content: {
        '& canvas': {
            maxHeight: '100%'
        }
    },
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            boxShadow: theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class PendingProductsView extends Component {

    state = {
        tabValue: 0,
        form: null
    };


    handleChangeTab = (event, tabValue) => {
        this.setState({ tabValue });
    };

    handleLink = link => {
        this.props.history.push(link);
    }

    render() {

        const { classes, tbillsProducts } = this.props;
        const { tabValue } = this.state;

        return (
            <FusePageSimple
                classes={{
                    toolbar     : "min-h-64 h-64",
                    content     : classes.content,
                }}
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{
                            root: "h-64 w-full border-b-1"
                        }}
                    >
                        <Tab className="h-64 normal-case" label="Treasury Bills" />
                        <Tab className="h-64 normal-case" label="Bonds" />
                    </Tabs>
                }
                content={
                    <div>
                        {tabValue === 0 && (
                            <TbillsProductList />
                        )}
                        {tabValue === 1 && (
                            <BondsProductList />
                        )}
                    </div>
                }
                sidebarInner
                onRef={instance => {
                    this.pageLayout = instance;
                }}
                innerScroll
            />
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PendingProductsView));
