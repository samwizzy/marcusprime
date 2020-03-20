import React, {Component} from 'react';
import { withStyles, Icon, Typography} from '@material-ui/core';
import {FuseAnimate} from '../../../../../@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as Actions from '../../store/actions';
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

class FDRateGuideLists extends Component {

    componentDidMount(){
    }

    render()
    {
        const { transactions } = this.props;
        const selectedTransactions = _.orderBy(transactions, ['createdAt'], ['desc']);

        const columns = [
            {
                name: "id",
                label: "ID",
                options: {
                    display: 'excluded',
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "minAmount",
                label: "Min. Amount",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "maxAmount",
                label: "Max Amount",
                options: {
                    filter: true,
                    sort: true,
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
                name: "tenorSeperatedBySlash",
                label: "Tenor",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "createdAt",
                label: "Created Date",
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
                name: "updatedAt",
                label: "Updated Date",
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
            downloadOptions: {filename: 'FDRateGuideLists.csv', separator: ','},
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
                    title={"Fixed Deposit Rate Guide"}
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
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FDRateGuideLists)));
