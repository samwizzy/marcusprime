import React, { Component } from 'react';
import { FormControlLabel, Switch, withStyles, Avatar, Divider, Icon, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { FuseAnimate } from '../../../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
// import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import AddButton from './AddButton'

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

class AllInvestmentList extends Component {

    render() {
        const { successfulInvestments } = this.props;

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
                name: "customerName",
                label: "Client Name",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "settlementDate",
                label: "Settlement Date",
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
                name: "product.productCategory.name",
                label: "Security Type",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: value => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {`FGN ${value}`}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "product.name",
                label: "Security Code",
                options: {
                    filter: true,
                    sort: false
                }
            },
            {
                name: "product.maturity",
                label: "Security Maturity Date",
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
                name: "product.yieldRate",
                label: "Yield",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "product.couponRate",
                label: "Coupon",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "faceValue",
                label: "Face Value",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "product.offer",
                label: "Discount Rate",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "amountInvested",
                label: "Consideration",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "custodyFee",
                label: "Custody Fee",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "vat",
                label: "Vat Custody Fee",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "tenor",
                label: "Tenor",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "product.productCategory.name",
                label: "Category",
                options: {
                    filter: true,
                    sort: false,
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
              name: 'Settlement Date',
              download: true,
            },
            {
              name: 'Security Type',
              download: true,
            },
            {
              name: 'Security Code',
              download: true,
            },
            {
              name: 'Security Maturity Date',
              download: true,
            },
            {
              name: 'Yield',
              download: true,
            },
            {
              name: 'Coupon',
              download: true,
            },
            {
              name: 'Face Value',
              download: true,
            },
            {
              name: 'Discount Rate',
              download: true,
            },
            {
              name: 'Consideration',
              download: true,
            },
            {
              name: 'Custody Fee',
              download: true,
            },
            {
              name: 'Vat Custody Fee',
              download: true,
            },
            {
              name: 'Tenor',
              download: true,
            },
            {
              name: 'Category',
              download: true,
            },
            {
              name: 'Request Date',
              download: true,
            }
        ];

        const footerNames = ['S/N', 'Client Name', 'Settlement Date', 'Security Type', 'Security Code', 'Security Maturity Date', 'Yield', 'Coupon', 'Face Value', 'Discount Rate', 'Consideration', 'Custody Fee', 'Vat Custody Fee', 'Tenor', 'Category', 'Request Date'];

        const options = {
            filterType: 'checkbox',
            responsive: 'scroll',
            selectableRows: 'none',
            responsive: 'scrollMaxHeight',
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'AllFailedInvestmentList.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                const categoriesIndex = columns.findIndex(c => c.label === "Nominal");
                const datas = data.map(item =>  {
                    if (categoriesIndex > -1) {
                        item.data[categoriesIndex] = new Intl.NumberFormat('en-NG', {}).format(item.data[categoriesIndex]);
                      return {
                          ...item,
                          data: item.data.map(m => moment(m, moment.ISO_8601, true).isValid() ? moment(m).format('lll') : m )
                      }
                    }
                })
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
            customToolbar: () => {
                return (
                    <AddButton investments={successfulInvestments} />
                );
            },
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"All Failed Investments"}
                    data={successfulInvestments}
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

function mapStateToProps({ allProductsApp }) {
    return {
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(AllInvestmentList)));
