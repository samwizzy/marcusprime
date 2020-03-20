import React, { Component } from 'react';
import { FormControlLabel, Switch, Typography, withStyles, Icon, Button } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../store/actions';
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
    bgColor: {
        backgroundColor: 'red'
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

class MakerCheckerList extends Component {

    render() {
        const { maker, classes, openMakerDialog, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Treasury Bills'; });

        console.log(maker, 'maker data');
        var data = _.orderBy(maker, ['createdAt'], ['desc']);

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
                    sort: false,
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
                label: "Maturity",
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
                name: "id",
                label: "Bid",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: id => {
                        const maka = data.find(mk => mk.id === id)
                        if (maka.productCategory.name === 'Treasury Bills') {
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {maka.bid}%
                                </Typography>
                            )
                        } else {
                            const nf = new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "NGN",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });

                            return nf.format(maka.bid);
                        }
                    },
                }
            },
            {
                name: "id",
                label: "Offer",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: id => {
                        const maka = data.find(mk => mk.id === id)
                        if (maka.productCategory.name === 'Treasury Bills') {
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {maka.offer}%
                                </Typography>
                            )
                        } else {
                            const nf = new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "NGN",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });

                            return nf.format(maka.offer);
                        }
                    },
                }
            },
            {
                name: "id",
                label: "Coupon Rate",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: id => {
                        const maka = data.find(mk => mk.id === id)
                        if (maka.productCategory.name === 'Bonds') {
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {maka.couponRate}%
                                </Typography>
                            )
                        } else {
                            return '';
                        }
                    },
                }
            },
            {
                name: "id",
                label: "Yield Rate",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: id => {
                        const maka = data.find(mk => mk.id === id)
                        if (maka.productCategory.name === 'Bonds') {
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {maka.yieldRate}%
                                </Typography>
                            )
                        } else {
                            return '';
                        }
                    },
                }
            },
            {
                name: "id",
                label: "Dealers Rate (Bid)",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: id => {
                        const maka = data.find(mk => mk.id === id)
                        if (maka.productCategory.name === 'Treasury Bills') {
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {maka.dealersRateBid}%
                                </Typography>
                            )
                        } else {
                            const nf = new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "NGN",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });

                            return nf.format(maka.dealersRateBid);
                        }
                    },
                }
            },
            {
                name: "id",
                label: "Dealers Rate (Offer)",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: id => {
                        const maka = data.find(mk => mk.id === id)
                        if (maka.productCategory.name === 'Treasury Bills') {
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {maka.dealersRateOffer}%
                                </Typography>
                            )
                        } else {
                            const nf = new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "NGN",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });

                            return nf.format(maka.dealersRateOffer);
                        }
                    },
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
                name: "productCategory.name",
                label: "Product Category",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "id",
                label: " ",
                options: {
                    customBodyRender: id => {
                        // const maka = makaFilter.find(mk => mk.id === id)
                        const maka = maker.find(mk => mk.id === id)
                        if (maka.status === 0) {
                            return (
                                <React.Fragment>
                                    <Button disabled={!(r && r.authorize || user.role && user.role.id === 1)}  onClick={() => openMakerDialog(id, 1)} variant="contained" color="secondary" className={classes.button}>
                                        Approve
                                   </Button>
                                    <Button disabled={!(r && r.authorize || user.role && user.role.id === 1)} onClick={() => openMakerDialog(id, 2)} variant="contained" color="primary" className={classNames(classes.button, classes.bgColor)}>
                                        Decline
                                   </Button>
                                </React.Fragment>
                            )
                        } else {
                        }
                    },
                },
            }
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25, 50, 100],
            downloadOptions: { filename: 'makerCheckerList.csv', separator: ',' },
            textLabels: {
                body: {
                    noMatch: <Loader type="Oval" color="inherit" height={50} width={50} timeout={5000} />,
                    toolTip: "Sort",
                    columnHeaderTooltip: column => `Sort for ${column.label}`
                }
            }
        };

        return (
            <div>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <MUIDataTable
                        title={"Product Checker"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </FuseAnimate>
                {/* ) : (
                        <div align='center'>
                            <Loader type="Oval" color="#303030" height={50} width={50} timeout={5000} />
                        </div>
                    )} */}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openMakerDialog: Actions.openMakerDialog,
    }, dispatch);
}

function mapStateToProps({ makerApp, auth }) {
    return {
        maker: makerApp.maker.tempProducts,
        user  : auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(MakerCheckerList)));
