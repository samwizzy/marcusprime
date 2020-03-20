import React, { Component } from 'react';
import { FormControlLabel, Switch, withStyles, Avatar, Divider, Icon, List, ListItem, ListItemText, Paper, Typography, Button, IconButton } from '@material-ui/core';
import { FuseAnimate } from '../../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../../store/actions';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import moment from 'moment';

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

class AllMaturitiesList extends Component {

    handleLink = id => {
        if(id){
            this.props.history.push('/running/maturity/' + id);
        }
    };

    render() {
        const { maturities, getInvestmentsByMaturity } = this.props;

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
                name: "id",
                label: "Amount",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: id => {
                        const invest = maturities.find(maturity => id === maturity.id)
                        const remainBalance = (invest.initialVolume - invest.totalVolume)

                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        if (remainBalance === '') {
                            return ''
                        }
                        return nf.format(remainBalance);
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
                name: "productCategory.name",
                label: "Category",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "maturity",
                label: "Maturity Date",
                options: {
                    filter: true,
                    sort: true,
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
                name: "id",
                label: "View",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        const maturity = maturities.find(maturity => value === maturity.id)

                        if (value === '') {
                            return ('');
                        } else {
                            return (
                                <FormControlLabel
                                    control={
                                        <Button variant="contained" color="primary">
                                            {/* <Icon>visibility</Icon>  */}
                                            View
                                        </Button>
                                    }
                                    onClick={() => {
                                        getInvestmentsByMaturity(maturity.id);
                                        this.handleLink(maturity.id);
                                    }}
                                />
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
              name: 'Amount',
              download: true,
            },
            {
              name: 'Product Code',
              download: true,
            },
            {
              name: 'Category',
              download: true,
            },
            {
              name: 'Maturity Date',
              download: true,
            },
            {
              name: 'View',
              download: true,
            }
        ];

        const footerNames = ['S/N', 'Amount', 'Product Code', 'Category', 'Maturity Date', 'View'];


        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'allMaturitiesList.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                const categoriesIndex = columns.findIndex(c => c.label === "Amount");
                const datas = data.map(item =>  {
                    if (categoriesIndex > -1) {
                        const selectedMaturity = maturities.find(mature => mature.id === item.data[categoriesIndex])
                        const amount = new Intl.NumberFormat('en-NG', {}).format(selectedMaturity.amount);
                        item.data[categoriesIndex] = (selectedMaturity.initialVolume - selectedMaturity.totalVolume)
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
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"All Running Maturities"}
                    data={maturities}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getInvestmentsByMaturity: Actions.getInvestmentsByMaturity,
    }, dispatch);
}

function mapStateToProps({ maturitiesApp }) {
    console.log(maturitiesApp, "All running maturity")
    return {
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(AllMaturitiesList)));
