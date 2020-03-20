import React, { Component } from 'react';
import { FormControlLabel, Switch, Typography, withStyles, Button, Icon } from '@material-ui/core';
import { FuseAnimate } from '../../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../../store/actions';
import AddButton from './AddButton';

const styles = theme => ({
    listItem: {
        color: 'inherit!important',
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
        '&.active': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText + '!important',
            pointerEvents: 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    }
});

class ProductCategoryList extends Component {

    render() {
        const { openNewBondsDialog, openEditProductCategoryDialog, bondsProduct, data, getProductCategoryDetails, productCategories } = this.props;

        const columns = [
            {
                name: "id",
                label: "S/N",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <FormControlLabel
                                label={tableMeta.rowIndex + 1}
                                control={
                                    <Icon></Icon>
                                }
                            />
                        );

                    }
                }
            },
            {
                name: "accountType",
                label: "Account Type",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "glAccountNumber",
                label: "GL Account Number",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "glName",
                label: "GL Name",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "name",
                label: "Name",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "thresholdDown",
                label: "Threshold Down",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const nf = new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        return nf.format(value);
                    }
                }
            },
            {
                name: "thresholdUp",
                label: "Threshold Up",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const nf = new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        return nf.format(value);
                    }
                }
            },
            {
                name: "id",
                label: " ",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        const productCategory = productCategories.find(productCategory => value === productCategory.id)
                        return (
                            <Button
                                variant="contained" 
                                color="primary"
                                onClick={evt => {
                                    evt.stopPropagation()
                                    openEditProductCategoryDialog(productCategory);
                                    // openEditTbillsDialog(this.state);
                                    getProductCategoryDetails(value);
                                    // updateProduct(tableMeta.rowData);
                                }}
                            >
                                edit
                            </Button>
                        );

                    }
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            // customToolbar: () => {
            //     return (
            //         <AddButton
            //             openNewBondsDialog={openNewBondsDialog}
            //         />
            //     );
            // }
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'productCategoryList.csv', separator: ','},
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"Product Categories Threshold"}
                    data={productCategories}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // openNewBondsDialog: Actions.openNewBondsDialog,
        openEditProductCategoryDialog: Actions.openEditProductCategoryDialog,
        getProductCategoryDetails: Actions.getProductCategoryDetails,
    }, dispatch);
}

function mapStateToProps({ productCategoryApp }) {
    return {
        productCategories: productCategoryApp.productCategories.productCategories
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductCategoryList)));
