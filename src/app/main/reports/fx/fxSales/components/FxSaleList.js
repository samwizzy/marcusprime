import React, { Component } from 'react';
import { withStyles, Typography, FormControlLabel, Icon, Link } from '@material-ui/core';
import { FuseAnimate, FusePageCarded } from '../../../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import _ from 'lodash';
import AddButton from './AddButton'

import 'react-day-picker/lib/style.css';


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
    },
    datePicker: {
        border: '1px solid red'
    }
});


const dateValues = {
    startDate: new Date(),
    endDate: new Date(),
    dateFilter: '',
}

class FxSaleList extends Component {

    state = { ...dateValues };

    handleLink = link => {
        this.props.history.push(link);
    }



    render() {

        const { fxSales } = this.props;

        var data = _.orderBy(fxSales, ['createdAt'], ['desc']);
        console.log(data, 'data getFxSales');

        const columns = [
            {
                name: "id",
                label: "S/N",
                options: {
                    display: "excluded",
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
                name: "clientName",
                label: "Client Name",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "currencyCode",
                label: "Currency Code",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "walletId",
                label: "Wallet Id",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "ref",
                label: "Ref",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "dollarEq",
                label: "USD Eq.",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "rate",
                label: "Rate",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "id",
                label: "Amount (FCY)",
                options: {
                    filter: true,
                    customBodyRender: id => {
                        const fxsales = data && data.find(d => d.id === id)
                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: fxsales.currencyCode,
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        return nf.format(fxsales.amount);
                    }
                }
            },
            {
                name: "nairaEq",
                label: "Amount (LCY)",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "transDate",
                label: "Trans. Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(day).format('DD-MM-YYYY')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "valueDate",
                label: "Value Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(day).format('DD-MM-YYYY')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "createdAt",
                label: "Request Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(day).format('DD-MM-YYYY')}
                            </Typography>
                        )
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
              name: 'Client Name',
              download: true,
            },
            {
              name: 'Currency Code',
              download: true,
            },
            {
              name: 'Wallet Id',
              download: true,
            },
            {
              name: 'Ref',
              download: true,
            },
            {
              name: 'USD Eq.',
              download: true,
            },
            {
              name: 'Rate',
              download: true,
            },
            {
              name: 'Amount (FCY)',
              download: true,
            },
            {
              name: 'Amount (LCY)',
              download: true,
            },
            {
              name: 'Trans. Date',
              download: true,
            },
            {
              name: 'Value Date',
              download: true,
            },
            {
              name: 'Request Date',
              download: true,
            }
        ];

        const footerNames = ['S/N', 'Client Name', 'Currency Code', 'Wallet Id', 'Ref', 'USD Eq.', 'Rate', 'Amount (FCY)', 'Amount (LCY)', 'Trans. Date', 'Value Date', 'Request Date'];


        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',

            // searchText: this.state.searchText,
            // searchPlaceholder: 'Your Custom Search Placeholder',
            customSearch: (searchQuery, currentRow, columns) => {
                let isFound = false;
                currentRow.forEach(col => {
                    if (col !== null && moment(col.toString(), moment.ISO_8601, true).isValid()) {
                        if (moment(col.toString()).format('DD-MM-YYYY').indexOf(searchQuery) >= 0) {
                            isFound = true;
                        }
                    } else {
                        if (col !== null && col.toString().indexOf(searchQuery) >= 0) {
                            isFound = true;
                        }
                    }
                });
                return isFound;
            },
            customToolbar: () => {
                return (
                    <AddButton />
                );
            },
            downloadOptions: {filename: 'fxSalesList.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                return (
                    buildHead(headerNames) +
                    buildBody(
                        data.concat({
                            index: data.length,
                            data: footerNames,
                        }),
                    )
                )
            }
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"Fx Sales Report"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({ fxsalesApp }) {
    return {
        fxSales: fxsalesApp.fx.getFxSales,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FxSaleList)));
