import React, { Component } from 'react';
import { FormControlLabel, withStyles, Icon, Typography, Link, Button } from '@material-ui/core';
import { FuseAnimate, FusePageCarded } from '../../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../../store/actions';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import reducer from '../../store/reducers';
import withReducer from '../../../../../app/store/withReducer';

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

class InvestmentsByProduct extends Component {

    componentDidMount() {
        const { getInvestmentsByMaturity, match } = this.props;
        getInvestmentsByMaturity(match.params.id);
    }

    handleLink = link => {
        this.props.history.push(link);
    }

    render() {
        const { investmentsByMaturity } = this.props;
        const filteredInvestmentsByMaturity = investmentsByMaturity && investmentsByMaturity.filter(maturity => maturity.active)
        console.log(filteredInvestmentsByMaturity, "filteredInvestmentsByMaturity")

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
                name: "amountInvested",
                label: "Amount Invested",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "product.productCategory.name",
                label: "Category",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "product.maturity",
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
                label: "View Customer Info",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        const investmentByMaturity = investmentsByMaturity.find(investmentByMaturity => value === investmentByMaturity.id)

                        if (value === '') {
                            return ('');
                        } else {
                            return (
                                <FormControlLabel
                                    control={
                                        <Button variant="contained" color="primary">
                                            View Customer Info
                                        </Button>
                                    }
                                    onClick={() => {
                                        this.handleLink('/users/accounts/' + investmentByMaturity.userUid);
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
        };

        return (
            <FusePageCarded
                header={
                    <div className="flex flex-1 items-center justify-between p-24">
                        <div className="flex flex-col">
                            <div className="flex items-center mb-16">
                                <Link color="inherit" onClick={() => this.handleLink('/apps/dashboards/analytics')}>
                                    <Icon className="text-18" color="action">home</Icon>
                                </Link>
                                <Icon className="text-16" color="action">chevron_right</Icon>
                                <Link color="inherit" onClick={() => this.handleLink('/running/maturity')}>
                                    <Typography color="textSecondary">Running Maturities</Typography>
                                </Link>
                                <Icon className="text-16" color="action">chevron_right</Icon>
                                <Typography color="textSecondary">Investments By Products</Typography>
                            </div>
                            <Typography variant="h6">Investments By Products</Typography>
                        </div>
                    </div>
                }
                classes={{
                    toolbar: "p-0",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                content={
                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <MUIDataTable
                            title={"Investments By Products"}
                            data={filteredInvestmentsByMaturity}
                            columns={columns}
                            options={options}
                        />
                    </FuseAnimate>
                }
                innerScroll
            />
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getInvestmentsByMaturity: Actions.getInvestmentsByMaturity,
    }, dispatch);
}

function mapStateToProps({ maturitiesApp }) {
    console.log(maturitiesApp.maturity, "maturitiesApp.maturity")
    return {
        investmentsByMaturity: maturitiesApp.maturity.investmentsByMaturity,
    }
}

export default withReducer('maturitiesApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestmentsByProduct))));
