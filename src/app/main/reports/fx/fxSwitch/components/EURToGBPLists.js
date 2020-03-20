import React, {Component} from 'react';
import {withStyles, Icon, Typography} from '@material-ui/core';
import {FuseAnimate} from '../../../../../../@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as Actions from '../../../store/actions';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import AddButton from './AddButton'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    listItem: {
        color         : 'inherit!important',
        textDecoration: 'none!important',
        height        : 40,
        width         : 'calc(100% - 16px)',
        borderRadius  : '0 20px 20px 0',
        paddingLeft   : 24,
        paddingRight  : 12,
        '&.active'    : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    }
});

class EURToGBPLists extends Component {

    render()
    {
        const { fxswitch, filteredFxswitch, isFiltering } = this.props;
        const allFxSwitch = isFiltering? filteredFxswitch : fxswitch;
        const filterFxswitch = allFxSwitch && allFxSwitch.filter(fx => (fx.buyCurrency === 'EUR' && fx.sellCurrency === 'GBP') || (fx.buyCurrency === 'GBP' && fx.sellCurrency === 'EUR'))
        const selectedFxswitch = _.orderBy(filterFxswitch, ['createdAt'], ['desc']);

        const columns = [
            {
                name: "id",
                label: "S/N",
                options: {
                    display: 'excluded',
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "customerName",
                label: "Customer Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "id",
                label: "SWITCH REFERENCE",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: id => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                FXSWITCH
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "id",
                label: "FORM M/A No.",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: id => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                FXSWITCH
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "id",
                label: "SOURCE OF FUND",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: id => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                AUTONOMOUS
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "id",
                label: "CLIENT CATEGORY",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: id => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                INDIVIDUAL
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "id",
                label: "PRODUCT TYPE",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: id => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                FXSPOT
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "buyCurrency",
                label: "BUY CURRENCY",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "sellCurrency",
                label: "SELL CURRENCY",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "amount",
                label: "AMOUNT",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: amount => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                { new Intl.NumberFormat('en-NG', {}).format(amount)}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "dollarEq",
                label: "Dollar Equiv.",
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
                name: "valueDate",
                label: "ValueDate",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: date => {
                        if(date === null) return '';
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(date).format('LLL')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "transDate",
                label: "Trans. Date",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: date => {
                        if(date === null) return '';
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(date).format('LLL')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "createdAt",
                label: "Date Created",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: date => {
                        if(date === null) return '';
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(date).format('LLL')}
                            </Typography>
                        )
                    }
                }
            }
        ];


        const headerNames = [
            {
              name: 'S/N',
              download: true,
            },
            {
              name: 'CUSTOMER NAME',
              download: true,
            },
            {
              name: 'SWITCH REFERENCE',
              download: true,
            },
            {
              name: 'FORM M/A No.',
              download: true,
            },
            {
              name: 'SOURCE OF FUND',
              download: true,
            },
            {
              name: 'CLIENT CATEGORY',
              download: true,
            },
            {
              name: 'PRODUCT TYPE',
              download: true,
            },
            {
              name: 'BUY CURRENCY',
              download: true,
            },
            {
              name: 'SELL CURRENCY',
              download: true,
            },
            {
              name: 'AMOUNT',
              download: true,
            },
            {
              name: 'DOLLAR EQUIV.',
              download: true,
            },
            {
              name: 'RATE',
              download: true,
            },
            {
              name: 'VALUE DATE',
              download: true,
            },
            {
              name: 'TRANS. DATE',
              download: true,
            },
            {
              name: 'DATE CREATED',
              download: true,
            }
        ];

        const footerNames = ['S/N', 'CUSTOMER NAME', 'SWITCH REFERENCE', 'FORM M/A No.', 'SOURCE OF FUND', 'CLIENT CATEGORY', 'PRODUCT TYPE', 'BUY CURRENCY', 'SELL CURRENCY', 'AMOUNT', 'DOLLAR EQUIV.', 'RATE', 'VALUE DATE', 'TRANS. DATE', 'DATE CREATED'];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            print: false,
            filter: false,
            viewColumns: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            customToolbar: () => {
                return (
                    <AddButton />
                );
            },
            downloadOptions: {filename: 'EURToGBPList.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                const switchReferenceIndex = columns.findIndex(c => c.label === "SWITCH REFERENCE");
                const formNoIndex = columns.findIndex(c => c.label === "FORM M/A No.");
                const productTypeIndex = columns.findIndex(c => c.label === "PRODUCT TYPE");
                const clientCategoryIndex = columns.findIndex(c => c.label === "CLIENT CATEGORY");
                const fundSourceIndex = columns.findIndex(c => c.label === "SOURCE OF FUND");
                const datas = data.map(item =>  {
                    if (productTypeIndex > -1 || clientCategoryIndex > -1 || fundSourceIndex > -1) {
                        item.data[switchReferenceIndex] = "FXSWITCH"
                        item.data[formNoIndex] = "FXSWITCH"
                        item.data[productTypeIndex] = "FXSPOT"
                        item.data[clientCategoryIndex] = "INDIVIDUAL"
                        item.data[fundSourceIndex] = "AUTONOMOUS"
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
            }
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"FX Switch Report (EUR/GBP)"}
                    data={selectedFxswitch}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({fxswitchApp}){
    console.log(fxswitchApp.fx, "fxswitchApp.fx")
    return {
        fxswitch: fxswitchApp.fx.fxswitch,
        filteredFxswitch: fxswitchApp.fx.filteredFxswitch,
        isFiltering: fxswitchApp.fx.isFiltering,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(EURToGBPLists)));
