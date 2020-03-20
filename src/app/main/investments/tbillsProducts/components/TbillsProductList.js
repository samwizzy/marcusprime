import React, { Component } from 'react';
import { Button, FormControlLabel, Typography, withStyles, Icon } from '@material-ui/core';
import { FuseAnimate } from '../../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../../store/actions';
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


class TbillsProductList extends Component {

    render() {
        const { openEditTbillsDialog, data, getTbillsDetails, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Treasury Bills'; });

        const sumAmount = _.sumBy(data, (o) => { return o.totalVolume; });

        // const newCol = {
        //     id: '',
        //     initialVolume: '',
        //     maturity: '',
        //     rate: 'Total Balance',
        //     totalVolume: sumAmount,
        //     id: '',
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

                        const tbill = data.find(tbill => value === tbill.id)

                        if (value === '') {
                            return ('');
                        } else {
                            return (
                                <Button
                                disabled={!(r && r.canedit || user && user.role.id === 1)}
                                onClick={evt => {
                                    evt.stopPropagation()
                                    openEditTbillsDialog(tbill);
                                    getTbillsDetails(value);
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

        const footerNames = ['S/N', 'Product Code', 'Amount On Offer', 'Maturity', 'Bid', 'Offer', 'Dealers Rate (Bid)', 'Dealers Rate (Offer)', 'Balance', 'Edit'];


        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            rowsPerPage: 25,
            rowsPerPageOptions: [25, 50, 100],
            downloadOptions: { filename: 'treasuryBillsProductList.csv', separator: ',' },
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
                    noMatch: <Loader type="Oval" color="#303030" height={50} width={50} />,
                    toolTip: "Sort",
                    columnHeaderTooltip: column => `Sort for ${column.label}`
                }
            },
            // customToolbar: () => {
            //     return (
            //         <AddButton
            //             openNewTbillsDialog={openNewTbillsDialog}
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
                return <CustomFooter
                    changePage={changePage}
                    count={count}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    changeRowsPerPage={changeRowsPerPage}
                    sumAmount={sumAmount}
                />;
            }
        };

        return (
            <div>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <MUIDataTable
                        title={"Online Treasury Bills"}
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
        getTbillsDetails: Actions.getTbillsDetails,
    }, dispatch);
}

function mapStateToProps({ tbillsApp, auth }) {
    console.log(auth.user.data, "auth.user.data")
    return {
        tbillsProduct: tbillsApp.tbills.tbillsProduct,
        user  : auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TbillsProductList)));
