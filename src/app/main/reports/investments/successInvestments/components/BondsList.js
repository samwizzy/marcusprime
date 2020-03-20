import React, { Component } from 'react';
import { withStyles, Typography, FormControlLabel, Icon } from '@material-ui/core';
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

class BondsList extends Component {

    render() {
        const { successfulBonds } = this.props;

        if(!successfulBonds){
            return ''
        }

        // let Bonds = _.filter(successfulBonds, item => item.product.productCategory.name === "Bonds");
        let Bonds = _.filter(successfulBonds, item => {
            if(item.product.productCategory !== null){
                return item.product.productCategory.name === "Bonds";
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
                name: "product.offer",
                label: "Discount Rate",
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

        const options = {
            filterType: 'checkbox',
            selectableRows: 'none',
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'BondsInvestmentList.csv', separator: ','},
            customToolbar: () => {
                return (
                    <AddButton />
                );
            },
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"All Successful Bonds"}
                    data={Bonds}
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

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(BondsList)));
