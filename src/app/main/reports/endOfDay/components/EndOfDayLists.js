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
import Loader from 'react-loader-spinner'
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

class EndOfDayLists extends Component {

    state = {
        paginate: {
            limit: 10, 
            start: 0,
            size: 1,
            payload: []
        }
    }

    static getDerivedStateFromProps(props, state){
        if (props.endofdays !== state.endofdays) {
            return {
                paginate: props.endofdays
            };
        }else if(props.filteredEndofdays !== state.filteredEndofdays){
            return {
                paginate: props.filteredEndofdays
            };
        } 
    }

    componentDidUpdate(props, state){
        const {endofdays, filteredEndofdays} = this.props
        if(props.endofdays !== this.props.endofdays){
            this.setState({paginate: endofdays})
        }else if(props.filteredEndofdays !== this.props.filteredEndofdays){
            this.setState({paginate: filteredEndofdays})
        }
    }

    render()
    {
        const { endofdays, getEndOfDays, filteredEndofdays, isFiltering, isLoading } = this.props;
        const { paginate } = this.state;
        const allEndOfDays = isFiltering? filteredEndofdays : endofdays
        const endOfDaysPayload = _.orderBy(allEndOfDays.payload, ['createdAt'], ['desc']);

        console.log(this.state, "this.state")
    
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
                label: "Customer Account Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "accountNumber",
                label: "Customer Account Number",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "currency",
                label: "Currency",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "balance",
                label: "Account Balance",
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
            }
        ];

        const headerNames = [
            {
              name: 'S/N',
              download: true,
            },
            {
              name: 'CUSTOMER ACCOUNT NAME',
              download: true,
            },
            {
              name: 'CUSTOMER ACCOUNT NUMBER',
              download: true,
            },
            {
              name: 'CURRENCY',
              download: true,
            },
            {
              name: 'ACCOUNT BALANCE',
              download: true,
            },
            {
              name: 'DATE CREATED',
              download: true,
            }
        ];

        const footerNames = ['S/N', 'CUSTOMER ACCOUNT NAME', 'CUSTOMER ACCOUNT NUMBER', 'CURRENCY', 'ACCOUNT BALANCE', 'DATE'];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            filter: false,
            sortDirection: 'desc',
            rowsPerPage: this.state.paginate.limit,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'EndOfDayList.csv', separator: ','},
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
            onTableChange: (action, tableState) => {
                console.log(action, "Action");
                console.log(tableState.page, "tableState Page");
                const { limit, start, size } = paginate
                switch (action) {
                    case 'changePage':
                      getEndOfDays({limit, start: tableState.page});
                      break;
                    case 'changeRowsPerPage':
                      getEndOfDays({limit, start: tableState.page});
                      break;
                }
            },
            onChangeRowsPerPage: (numberOfRows) => {
                console.log(numberOfRows, "numberOfRows")
                getEndOfDays({numberOfRows, start: 0});
            },
            customToolbar: () => {
                return (
                    <AddButton />
                );
            },
            page: paginate.start,
            count: paginate.size,
            serverSide: true
        };

        if(isLoading){
            return <Loader type="Oval" color={this.props.theme.palette.secondary.light} height={60} width={60} />
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"End Of Day Report"}
                    // data={allEndOfDays.payload}
                    data={endOfDaysPayload}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getEndOfDays: Actions.getEndOfDays,
        getEndOfDaysByCurrency: Actions.getEndOfDaysByCurrency,
        getEndOfDaysByCreatedDate: Actions.getEndOfDaysByCreatedDate,
        getEndOfDaysByCurrencyAndDataCreated: Actions.getEndOfDaysByCurrencyAndDataCreated,
    }, dispatch);
}

function mapStateToProps({endOfDayApp}){
    console.log(endOfDayApp.endofday, "endOfDayApp.endofday")
    return {
        endofdays: endOfDayApp.endofday.data,
        filteredEndofdays: endOfDayApp.endofday.filteredData,
        isFiltering: endOfDayApp.endofday.isFiltering,
        isLoading: endOfDayApp.endofday.isLoading,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(EndOfDayLists)));
