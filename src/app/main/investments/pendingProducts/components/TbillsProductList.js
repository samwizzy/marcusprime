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


class TbillsProductList extends Component {

    componentDidMount() {
        const { getPendingTbillsProduct } = this.props;

        getPendingTbillsProduct(1);
    }

    render() {
        const { enableProduct, openNewTbillsDialog, openEditTbillsDialog, tbillsProducts, classes, openNewTbillsMaturityUpload, openEditTbillsMaturityUpload, openConfirmDialog, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Treasury Bills'; });

        var data = _.orderBy(tbillsProducts, ['createdAt'], ['desc']);

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
                name: "bid",
                label: "Bid",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: value => <span>{value}%</span>
                }
            },
            {
                name: "offer",
                label: "Offer",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: value => <span>{value}%</span>
                }
            },
            {
                name: "dealersRateBid",
                label: "Dealers Rate (Bid)",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: value => <span>{value}%</span>
                }
            },
            {
                name: "dealersRateOffer",
                label: "Dealers Rate (Offer)",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: value => <span>{value}%</span>
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
                    customBodyRender: value => {
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

                        const tbill = tbillsProducts.find(tbill => value === tbill.id)

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
                                    openEditTbillsDialog(tbill);
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
                        const Tbills = tbillsProducts.find(tbill => id === tbill.id);

                        return (
                            <FormControlLabel
                                label={Tbills.available ? "Disable" : "Enable"}
                                value={Tbills.available ? "Disable" : "Enable"}
                                control={
                                    <Switch
                                    disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                                    color="primary" 
                                    checked={Tbills.available} 
                                    value={Tbills.available === true ? false : true} 
                                    />
                                }
                                onChange={(evt) => {
                                    if (Tbills.available === true) {
                                        enableProduct(Tbills, false);
                                    } else {
                                        enableProduct(Tbills, true);
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
                        openNewDialog={openNewTbillsDialog}
                        openNewMaturityUpload={openNewTbillsMaturityUpload}
                        openEditMaturityUpload={openEditTbillsMaturityUpload}
                    />
                );
            },
            rowsPerPage: 25,
            rowsPerPageOptions: [25, 50, 100],
            downloadOptions: { filename: 'tbillsProductList.csv', separator: ',' },
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
                        title={"Treasury Bills"}
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
        openNewTbillsDialog: Actions.openNewTbillsDialog,
        openEditTbillsDialog: Actions.openEditTbillsDialog,
        openNewTbillsMaturityUpload: Actions.openNewTbillsMaturityUpload,
        openEditTbillsMaturityUpload: Actions.openEditTbillsMaturityUpload,
        getPendingTbillsProduct: Actions.getPendingTbillsProduct,
        openConfirmDialog: Actions.openConfirmDialog,
        enableProduct: Actions.enableProduct,
    }, dispatch);
}

function mapStateToProps({ pendingProductsApp, auth }) {
    return {
        tbillsProducts: pendingProductsApp.tbills.tbillsProducts,
        user   : auth.user.data,
        rights : auth.rights.right.rights
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TbillsProductList)));
