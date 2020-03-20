import React, { Component } from 'react';
import { withStyles, Typography, FormControlLabel, Icon, Button } from '@material-ui/core';
import { FuseAnimate } from '../../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../../store/actions';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import _ from 'lodash';
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

class BondsList extends Component {

    handleLink = id => {
        if(id){
            this.props.history.push('/running/maturity/' + id);
        }
    };

    render() {
        const { maturitiesBonds, getInvestmentsByMaturity } = this.props;

        if(!maturitiesBonds){
            return ''
        }

        // let Bonds = _.filter(maturitiesBonds, item => item.product.productCategory.name === "Bonds");
        let Bonds = _.filter(maturitiesBonds, item => {
            if(item.productCategory !== null){
                return item.productCategory.name === "Bonds";
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
                name: "id",
                label: "Amount",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: id => {
                        const invest = Bonds.find(bond => id === bond.id)
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
                        const maturity = Bonds.find(maturity => value === maturity.id)

                        if (value === '') {
                            return ('');
                        } else {
                            return (
                                <FormControlLabel
                                    control={
                                        <Button variant="contained" color="primary">
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
            downloadOptions: {filename: 'AllBondsMaturityList.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                const categoriesIndex = columns.findIndex(c => c.label === "Amount");
                const datas = data.map(item =>  {
                    if (categoriesIndex > -1) {
                        const selectedMaturity = maturitiesBonds.find(mature => mature.id === item.data[categoriesIndex])
                        const amount = (selectedMaturity.initialVolume - selectedMaturity.totalVolume)
                        item.data[categoriesIndex] = new Intl.NumberFormat('en-NG', {}).format(amount);
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
                    title={"All Bonds Maturities"}
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
        getInvestmentsByMaturity: Actions.getInvestmentsByMaturity,
    }, dispatch);
}

function mapStateToProps({ maturitiesApp }) {
    return {
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(BondsList)));
