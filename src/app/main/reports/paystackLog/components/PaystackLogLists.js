import React, {Component} from 'react';
import { withStyles, Icon, Typography} from '@material-ui/core';
import {FuseAnimate} from '../../../../../@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as Actions from '../../store/actions';
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

class PaystackLogLists extends Component {

    state = {
        paginate: {
            limit: 1, 
            start: 0,
            size: 1,
            payload: []
        }
    }

    static getDerivedStateFromProps(props, state){
        if (props.paystacklogs !== state.paginate) {
            return {
                paginate: props.paystacklogs
            };
        } 
    }

    componentDidMount(){
        console.log(moment('2019-12-19T18:06:50.648+0000').isBetween('2019-12-02', '2019-12-12'), "Moment isBetween Function")
    }

    componentDidUpdate(props, state){
        const {paystacklogs} = this.props
        // const selectedData = paystacklogs && paystacklogs.filter(paystacklog => moment(paystacklog.createdAt).isBetween('2019-12-02', '2019-12-12'))
        // console.log(selectedData, "moment selectedData")
    }

    render()
    {
        const { paystacklogs, filteredPaystacklogs, isFiltering, getPaystackLogs } = this.props;
        const { paginate } = this.state;
        // const selectedpaystacklogs = _.orderBy(paystacklogs, ['createdAt'], ['desc']);
        console.log(paystacklogs, "paystack log")
        console.log(filteredPaystacklogs, "filteredPaystacklogs log")
        const allPaystackLogs = isFiltering? filteredPaystacklogs : paystacklogs

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
                name: "ref",
                label: "Ref",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "status",
                label: "Status",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "walletId",
                label: "Wallet ID",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "amount",
                label: "Amount",
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
            },
        ];

        const headerNames = [
            {
              name: 'S/N',
              download: true,
            },
            {
              name: 'REF',
              download: true,
            },
            {
              name: 'STATUS',
              download: true,
            },
            {
              name: 'WALLET ID',
              download: true,
            },
            {
              name: 'AMOUNT',
              download: true,
            },
            {
              name: 'DATE CREATED',
              download: true,
            }
        ];

        const footerNames = ['WALLET ID', 'REF', 'AMOUNT', 'STATUS', 'DATE CREATED'];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            filter: false,
            // rowsPerPage: 25,
            // rowsPerPageOptions: [25,50,100],
            rowsPerPage: 1,
            rowsPerPageOptions: [1,5,10],
            downloadOptions: {filename: 'PaystackLogList.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                const categoriesIndex = columns.findIndex(c => c.label === "Amount");
                const datas = data.map(item =>  {
                    if (categoriesIndex > -1) {
                        const selectedPaystack = allPaystackLogs.payload.find(paystack => paystack.id === item.data[categoriesIndex])
                        const amount = new Intl.NumberFormat('en-NG', {}
                        ).format(selectedPaystack.amount);
                        item.data[categoriesIndex] = amount
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
            onTableChange: (action, tableState) => {
                console.log(action, "Action");
                console.log(tableState.page, "tableState.page");
                const { limit, start, size } = paginate
                switch (action) {
                    case 'changeRowsPerPage':
                        getPaystackLogs({limit, start: tableState.page});
                        break;
                    case 'changePage':
                        getPaystackLogs({limit, start: tableState.page});
                        break;
                }
            },
            customToolbar: () => {
                return (
                    <AddButton />
                );
            },
            count: paginate.limit * paginate.size,
            serverSide: true
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"Paystack Log Report"}
                    data={allPaystackLogs.payload}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getPaystackLogs: Actions.getPaystackLogs
    }, dispatch);
}

function mapStateToProps({paystackLogApp}){
    console.log(paystackLogApp, "paystackLogApp.paystacklog")
    return {
        paystacklogs: paystackLogApp.paystacklog.data,
        filteredPaystacklogs: paystackLogApp.paystacklog.filterData,
        isFiltering: paystackLogApp.paystacklog.isFiltering,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(PaystackLogLists)));
