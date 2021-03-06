import React, { Component } from 'react';
import { FormControlLabel, withStyles, Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '../../../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import _ from 'lodash';
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

class TBillsList extends Component {

    render() {
        const { successfulTbills } = this.props;

        if(successfulTbills === null){
            return;
        }
        
        // let TBills = _.filter(successfulTbills, item => item.product.productCategory.name === "Treasury Bills");
        let TBills = _.filter(successfulTbills, item => {
            if(item.product.productCategory !== null){
                return item.product.productCategory.name === "Treasury Bills"
            }
        });

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
            {
                name: "createdAt",
                label: "Trade Date",
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
                    sort: false,
                    customBodyRender: value => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {value}
                            </Typography>
                        )
                    }
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
                name: "faceValue",
                label: "Face Value",
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
                label: "Trade Date",
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

        const footerNames = ['S/N', 'Client Name', 'Settlement Date', 'Security Type', 'Security Code', 'Security Maturity Date', 'Face Value', 'Discount Rate', 'Consideration', 'Custody Fee', 'Vat Custody Fee', 'Tenor', 'Category', 'Request Date'];


        const options = {
            filterType: 'checkbox',
            selectableRows: 'none',
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'TbillsInvestmentList.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                const categoriesIndex = columns.findIndex(c => c.label === "Security Type");
                const datas = data.map(item =>  {
                    if (categoriesIndex > -1) {
                        item.data[categoriesIndex] = `FGN ${item.data[categoriesIndex]}`;
                    }
                    return {
                        ...item,
                        data: item.data.map(m => moment(m, moment.ISO_8601, true).isValid() ? moment(m).format('lll') : m )
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
                    <AddButton />
                );
            },
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"All Successful Treasury Bills"}
                    data={TBills}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ allProductsApp }) {
    return {

    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TBillsList)));
