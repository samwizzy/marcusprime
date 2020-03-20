import React, { Component } from 'react';
import { FormControlLabel, Switch, Typography, withStyles, Button, Icon, TableRow, TableCell, Table, TableHead, TableBody } from '@material-ui/core';
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


class PendingTbillsProductList extends Component {

    render() {
        const { openNewTbillsDialog, openEditTbillsDialog, tbillsProduct, data, getTbillsDetails, user, rights } = this.props;
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
                name: "rate",
                label: "Discount Rate",
                options: {
                    filter: true,
                    sort: false,
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
                label: " ",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {

                        const tbill = data.find(tbill => value === tbill.id)

                        if (value === '') {
                            return ('');
                        } else {
                            return (
                                <FormControlLabel
                                    control={
                                        <Button variant="contained"color="primary">edit</Button>
                                    }
                                    onClick={evt => {
                                        evt.stopPropagation()
                                        openEditTbillsDialog(tbill);
                                        // openEditTbillsDialog(this.state);
                                        getTbillsDetails(value);
                                        // updateProduct(tableMeta.rowData);
                                    }}
                                />
                            );
                        }
                    }
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            customToolbar: () => {
                return (
                    <AddButton
                        openNewTbillsDialog={openNewTbillsDialog}
                    />
                );
            },
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
        getTbillsDetails: Actions.getTbillsDetails,
    }, dispatch);
}

function mapStateToProps({ tbillsApp, auth }) {
    return {
        tbillsProduct: tbillsApp.tbills.tbillsProduct,
        user  : auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingTbillsProductList)));
