import React, { Component } from 'react';
import { FormControlLabel, Switch, Typography, withStyles, Icon, Button } from '@material-ui/core';
import { FuseAnimate } from '../../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../../store/actions';
import AddButton from './AddButton';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classnames'
import CustomFooter from "./CustomFooter";
import Loader from 'react-loader-spinner';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    PbgColor: {
        color: '#1976d2'
    },
    AbgColor: {
        color: 'green'
    },
    DbgColor: {
        color: 'red'
    },
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


class BondsProductList extends Component {

    componentDidMount() {
        const { getPendingBondsProduct } = this.props;

        getPendingBondsProduct(2);
    }

    render() {
        const { disableProduct, openNewBondsDialog, openNewBondsMaturityUpload, openEditBondsMaturityUpload, openEditBondsDialog, bondsProducts, classes, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Bonds'; });
        var data = _.orderBy(bondsProducts, ['createdAt'], ['desc']);

        const columns = [
            {
                name: "id",
                label: "S/N",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        if (value === '') {
                            return ('')
                        } else {
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
                }
            },
            {
                name: "name",
                label: "Product Code",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "initialVolume",
                label: "Amount On Offer",
                options: {
                    filter: true,
                    // sort: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        if (value === '') {
                            return ''
                        }
                        return nf.format(value);
                    }
                }
            },
            {
                name: "maturity",
                label: "Maturity Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        if (day === '') {
                            return ('')
                        } else {
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {moment(day).format('LL')}
                                </Typography>
                            )
                        }
                    }
                }
            },
            {
                name: "couponRate",
                label: "Coupon Rate",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: value => <span>{value}%</span>
                }
            },
            {
                name: "yieldRate",
                label: "Yield Rate",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: value => <span>{value}%</span>
                }
            },
            {
                name: "bid",
                label: "Bid",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: value => {
                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        if (value === '') {
                            return ''
                        }
                        return nf.format(value);
                    }
                }
            },
            {
                name: "offer",
                label: "Offer",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: value => {
                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        if (value === '') {
                            return ''
                        }
                        return nf.format(value);
                    }
                }
            },
            {
                name: "dealersRateBid",
                label: "Dealers Rate (Bid)",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        if (value === '') {
                            return ''
                        }
                        return nf.format(value);
                    }
                }
            },
            {
                name: "dealersRateOffer",
                label: "Dealers Rate (Offer)",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        if (value === '') {
                            return ''
                        }
                        return nf.format(value);
                    }
                }
            },
            {
                name: "productId",
                label: "",
                options: {
                    display: false,
                    viewColumns: false,
                }
            },
            {
                name: "totalVolume",
                label: "Balance",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const nf = new Intl.NumberFormat("en-US", {
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
                name: "status",
                label: "Status",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: status => {
                        if (status === 0) {
                            return (
                                <React.Fragment>
                                    <Typography variant="body2" color="secondary" className={classNames(classes.button, classes.PbgColor)}>
                                        Pending
                                   </Typography>
                                </React.Fragment>
                            )
                        } else if (status === 1) {
                            return (
                                <React.Fragment>
                                    <Typography variant="body2" color="primary" className={classNames(classes.button, classes.AbgColor)}>
                                        Approved
                                   </Typography>
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <React.Fragment>
                                    <Typography variant="body2" color="secondary" className={classNames(classes.button, classes.DbgColor)}>
                                        Declined
                                   </Typography>
                                </React.Fragment>
                            )
                        }
                    }
                }
            },
            {
                name: "id",
                label: "Edit",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        const bond = bondsProducts.find(bond => value === bond.id)

                        if (value === '') {
                            return ('');
                        } else {
                            return (
                                <Button
                                variant="contained"
                                color="primary"
                                disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                                onClick={evt => {
                                    evt.stopPropagation()
                                    openEditBondsDialog(bond);
                                }}
                                >
                                    <Icon>create</Icon> Edit
                                </Button>
                            );
                        }
                    }
                }
            },
            {
                name: "id",
                label: "Action",
                options: {
                    customBodyRender: id => {
                        const bond = bondsProducts.find(bond => id === bond.id);

                        return (
                            <FormControlLabel
                                label={bond.available ? "Enable" : "Disable"}
                                value={bond.available ? "Enable" : "Disable"}
                                control={
                                    <Switch
                                    color="primary"
                                    checked={bond.available} 
                                    disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                                    value={bond.available === true ? false : true} 
                                    />
                                }
                                onChange={(evt) => {
                                    if (bond.available === true) {
                                        disableProduct(bond, false);
                                    } else {
                                        disableProduct(bond, true);
                                    }
                                }}
                            />
                        );

                        // return (
                        //     <div>
                        //         {
                        //             Tbills.available === true ?
                        //                 (
                        //                     <React.Fragment>
                        //                         <Button onClick={() => openConfirmDialog(id, false)} variant="contained" color="primary" className={classNames(classes.button, classes.bgColor)}>
                        //                             Disable
                        //                         </Button>
                        //                     </React.Fragment>
                        //                 ) : (
                        //                     <React.Fragment>
                        //                         <Button onClick={() => openConfirmDialog(id, true)} variant="contained" color="secondary" className={classes.button}>
                        //                             Enable
                        //                         </Button>
                        //                     </React.Fragment>
                        //                 )
                        //         }
                        //     </div>
                        // )
                    },
                },
            },
        ];


        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            customToolbar: () => {
                return (
                    <AddButton
                        canCreate={(r && r.cancreate || user.role && user.role.id === 1)}
                        openNewDialog={openNewBondsDialog}
                        openNewMaturityUpload={openNewBondsMaturityUpload}
                        openEditMaturityUpload={openEditBondsMaturityUpload}
                    />
                );
            },
            rowsPerPage: 25,
            rowsPerPageOptions: [25, 50, 100],
            downloadOptions: { filename: 'bondsProductList.csv', separator: ',' },
            filter: false,
            textLabels: {
                body: {
                    noMatch: <Loader type="Oval" color="inherit" height={50} width={50} />,
                    toolTip: "Sort",
                    columnHeaderTooltip: column => `Sort for ${column.label}`
                }
            }
            // customFooter: (
            //     count,
            //     page,
            //     rowsPerPage,
            //     changeRowsPerPage,
            //     changePage
            // ) => {
            //     return <CustomFooter
            //         changePage={changePage}
            //         count={count}
            //         page={page}
            //         rowsPerPage={rowsPerPage}
            //         changeRowsPerPage={changeRowsPerPage}
            //         sumAmount={sumAmount}
            //     />;
            // }
        };

        return (
            <div>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <MUIDataTable
                        title={"Bonds"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </FuseAnimate>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openNewBondsDialog: Actions.openNewBondsDialog,
        openEditBondsDialog: Actions.openEditBondsDialog,
        openNewBondsMaturityUpload: Actions.openNewBondsMaturityUpload,
        openEditBondsMaturityUpload: Actions.openEditBondsMaturityUpload,
        getPendingBondsProduct: Actions.getPendingBondsProduct,
        disableProduct: Actions.disableProduct,
    }, dispatch);
}

function mapStateToProps({ pendingProductsApp, auth }) {
    return {
        bondsProducts: pendingProductsApp.bonds.bondsProducts,
        user   : auth.user.data,
        rights : auth.rights.right.rights
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(BondsProductList)));
