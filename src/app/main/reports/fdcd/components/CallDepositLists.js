import React, {Component} from 'react';
import {withStyles, Icon, Typography} from '@material-ui/core';
import {FuseAnimate} from '../../../../../@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
// import * as Actions from '../../store/actions';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import moment from 'moment'
import _ from 'lodash'
import AddButton from './AddButton'

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

class CallDepositLists extends Component {

    state = {
        selectedDate: new Date('2014-08-18T21:11:54')
    }

    componentDidMount(){
    }

    handleDateChange = date => {
        this.setState({selectedDate: date});
    };

    render()
    {
        const { transactions, deposits } = this.props;
        const { selectedDate } = this.state;
        const selectedTransactions = _.orderBy(transactions, ['createdAt'], ['desc']);

        const columns = [
            {
                name: "id",
                label: "Marcus Ref No.",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "type",
                label: "Wallet Code",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "narration",
                label: "customer Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "bookingDate",
                label: "Booking Date",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: date => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(date).format('lll')}
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
                    sort: true,
                    customBodyRender: date => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(date).format('lll')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "maturityDate",
                label: "Maturity Date",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: date => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(date).format('lll')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "maturityDate",
                label: "Principal Amount",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: amount => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                { new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "currency",
                label: "Currency",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "intRate",
                label: "Interest Rate",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "tenor",
                label: "Tenor",
                options: {
                    filter: true,
                    sort: true,

                }
            },
            {
                name: "status",
                label: "Status",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: status => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {status === false? <Icon>cancel</Icon> : <Icon>done_all</Icon>}
                            </Typography>
                        )
                    }
                }
            }
        ];

        const headerNames = [
            {
              name: 'TRANS. REF NO.',
              download: true,
            },
            {
              name: 'WALLET CODE',
              download: true,
            },
            {
              name: 'CUSTOMER NAME',
              download: true,
            },
            {
              name: 'BOOKING DATE',
              download: true,
            },
            {
              name: 'VALUE DATE',
              download: true,
            },
            {
              name: 'MATURITY DATE',
              download: true,
            },
            {
              name: 'PRINCIPAL AMOUNT',
              download: true,
            },
            {
              name: 'CURRENCY',
              download: true,
            },
            {
              name: 'INT. RATE',
              download: true,
            },
            {
              name: 'TENOR',
              download: true,
            },
            {
              name: 'STATUS',
              download: true,
            }
        ];

        const footerNames = ['TRANS. REF NO.', 'WALLET CODE', 'CUSTOMER NAME', 'BOOKING DATE', 'VALUE DATE', 'MATURITY DATE', 'PRINCIPAL AMOUNT', 'CURRENCY', 'INT. RATE', 'TENOR', 'STATUS'];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            print: false,
            filter: false,
            viewColumns: false,
            downloadOptions: {filename: 'CallDepositLists.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                const dates = data.map(d => ({...d, data: d.data.map(m => moment(m, moment.ISO_8601, true).isValid() ? moment(m).format('lll') : m )}));

                return (
                    buildHead(headerNames) +
                    buildBody(
                        dates.concat({
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
                    title={"Call Deposit Report"}
                    data={selectedTransactions}
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

function mapStateToProps({fdcdReportsApp}){
    return {
        deposits: fdcdReportsApp.fdcd.data
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CallDepositLists)));