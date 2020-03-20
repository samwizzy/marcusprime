import React, { Component } from 'react';
import { withStyles, Fab, Icon, Link, Typography } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../store/withReducer';
import ProductCategoryList from './components/ProductCategoryList';
import ProductCategoryDialog from './ProductCategoryDialog';
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

class ProductCategoryApp extends Component {

    componentDidMount() {
        const { getProductCategories } = this.props;

        getProductCategories();
    }

    handleLink = link => {
        this.props.history.push(link);
    }

    render() {

        return (
            <React.Fragment>
                <FusePageSimple
                    // header={
                    //     <div className="flex flex-1 items-center justify-between p-24">
                    //         <div className="flex flex-col">
                    //             <div className="flex items-center mb-16">
                    //                 <Link color="inherit" onClick={evt => this.handleLink('/')}>
                    //                     <Icon className="text-18" color="action">home</Icon>
                    //                 </Link>
                    //                 <Icon className="text-16" color="action">chevron_right</Icon>
                    //                 <Typography color="textSecondary">Product Categories</Typography>
                    //             </div>
                    //         </div>
                    //     </div>
                    // }
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        toolbar: "p-0",
                        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    content={
                        <ProductCategoryList />
                    }
                />
                <ProductCategoryDialog />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getProductCategories: Actions.getProductCategories,
    }, dispatch);
}

function mapStateToProps({ productCategoryApp }) {
    return {}
}

export default withReducer('productCategoryApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductCategoryApp))));
