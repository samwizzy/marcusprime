import React, { Component } from 'react';
import { Button, FormControlLabel, Switch, Typography, withStyles, Icon } from '@material-ui/core';
import { FuseAnimate } from '../../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../../store/actions';
import AddButton from './AddButton';
import moment from 'moment';
import _ from 'lodash';
import CustomFooter from "./CustomFooter";
import Loader from 'react-loader-spinner';

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

class BondsProductsList extends Component {

    render() {
        const { openNewBondsDialog, openEditBondsDialog, bondsProduct, data, getBondsDetails, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Bonds'; });

        console.log(r, "Single bonds right")

        const sumAmount = _.sumBy(data, (o) => { return o.totalVolume; });

        // const newCol = {
        //     id: '',
        //     initialVolume: '',
        //     maturity: '',
        //     rate: 'Total',
        //     totalVolume: sumAmount,
        //     id: '',
        //     cleanPrice: '',
        // }

        // data.push(newCol)

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
                name: "offer",
                label: "Offer",
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

                        return nf.format(value);
                    }
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
                name: "id",
                label: "Edit",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        const bond = data.find(bond => value === bond.id)

                        if (value === '') {
                            return ('');
                        } else {
                            return (
                                <Button
                                color="primary"
                                disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                                onClick={evt => {
                                    evt.stopPropagation()
                                    openEditBondsDialog(bond);
                                    getBondsDetails(value);
                                }}
                                >
                                    <Icon>create</Icon> Edit
                                </Button>
                            );
                        }
                    }
                }
            },
        ];

        const headerNames = [
            {
              name: 'S/N',
              download: true,
            },
            {
              name: 'Product Code',
              download: true,
            },
            {
              name: 'Amount On Offer',
              download: true,
            },
            {
              name: 'Maturity',
              download: true,
            },
            {
              name: 'Coupon Rate',
              download: true,
            },
            {
              name: 'Yield Rate',
              download: true,
            },
            {
              name: 'Bid',
              download: true,
            },
            {
              name: 'Offer',
              download: true,
            },
            {
              name: 'Dealers Rate (Bid)',
              download: true,
            },
            {
              name: 'Dealers Rate (Offer)',
              download: true,
            },
            {
              name: 'Balance',
              download: true,
            },
            {
              name: 'Edit',
              download: true,
            }
        ];

        const footerNames = ['S/N', 'Product Code', 'Amount On Offer', 'Maturity', 'Coupon Rate', 'Yield Rate', 'Bid', 'Offer', 'Dealers Rate (Bid)', 'Dealers Rate (Offer)', 'Balance', 'Edit'];


        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            rowsPerPage: 25,
            rowsPerPageOptions: [25, 50, 100],
            downloadOptions: { filename: 'bondsProductList.csv', separator: ',' },
            onDownload: (buildHead, buildBody, columns, data) => {
                const datas = data.map(d => ({...d, data: d.data.map(m => moment(m, moment.ISO_8601, true).isValid() ? moment(m).format('lll') : m )}));

                return (
                    buildHead(headerNames) +
                    buildBody(
                        datas.concat({
                            index: data.length,
                            data: footerNames,
                        }),
                    )
                )
            },
            filter: false,
            textLabels: {
                body: {
                    noMatch: <Loader type="Oval" color="#303030" height={50} width={50} timeout={5000} />,
                    toolTip: "Sort",
                    columnHeaderTooltip: column => `Sort for ${column.label}`
                }
            },
            // customToolbar: () => {
            //     return (
            //         <AddButton
            //             openNewBondsDialog={openNewBondsDialog}
            //         />
            //     );
            // },
            customFooter: (
                count,
                page,
                rowsPerPage,
                changeRowsPerPage,
                changePage
            ) => {
                return <CustomFooter changePage={changePage} count={count} sumAmount={sumAmount} />;
            }
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
        getBondsDetails: Actions.getBondsDetails,
    }, dispatch);
}

function mapStateToProps({ bondsApp, auth }) {
    return {
        bondsProduct: bondsApp.bonds.bondsProduct,
        user  : auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(BondsProductsList)));
