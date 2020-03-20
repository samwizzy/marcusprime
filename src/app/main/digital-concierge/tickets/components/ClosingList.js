import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MUIDataTable from 'mui-datatables'
import {FuseExample, FusePageSimple, FuseChipSelect } from '../../../../../@fuse';
import { Link, withRouter } from 'react-router-dom';
import withReducer from '../../../../../app/store/withReducer';
import reducer from '../../store/reducers';
import { Icon, IconButton, Typography, TableRow, TableCell } from '@material-ui/core'
import CustomToolbar from './CustomToolbar'
import * as Actions from '../../store/actions'
import { AddTicket } from './AddButton'
import TicketsDialog from './TicketsDialog'
import CommentTicketDialog from './CommentTicketDialog'
import moment from 'moment';
import _ from 'lodash'

class ClosingList extends React.Component {
    state = {
        data: [],
        composeDialog: false,
        commentDialog: false,
    }

    componentDidMount(){
        this.props.getTickets()
    }

    openNewComposeDialog = () => {
        this.setState({composeDialog: true});
        // this.props.openNewTicketDialog()
    };

    openComposeDialog = () => {
        this.setState({composeDialog: true});
    };

    closeComposeDialog = () => {
        this.setState({composeDialog: false});
    };

    openCommentDialog = () => {
        this.setState({commentDialog: true});
    };

    closeCommentDialog = () => {
        this.setState({commentDialog: false});
    };

    handleRoute = (id) => {
        this.props.history.push('/apps/ticket/' + id);
    };

    render() {

        const { tickets } = this.props

        console.log(tickets, "Ticket shit bang")

        const columns = [
            {
                name: "id",
                label: "Id",
                options: {
                    display: 'excluded',
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "requestName",
                label: "Request Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "dept.name",
                label: "Department",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "createdAt",
                label: "Created Time",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: createdAt => {
                        return (
                            <Typography variant="inherit">{moment(createdAt).format('LLL')}</Typography>
                        );
                    }
                }
            },
            {
                name: "id",
                label: "Response Time",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: id => {
                        const ticket = tickets && tickets.find(ticket => ticket.id === id)
                        if(ticket.comments && ticket.comments.length > 0){
                            return (
                                <Typography variant="inherit">{moment(ticket.comments[0].createdAt).format('LLL')}</Typography>
                            );
                        }else{
                            return (
                                <Typography variant="inherit">No response yet</Typography>
                            );
                        }
                    }
                }
            },
            {
                name: "id",
                label: "Closed Time",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: id => {
                        const ticket = tickets && tickets.find(ticket => ticket.id === id)

                        if(ticket.comments && ticket.comments.length > 0 && ticket.status === 2){
                            const then = moment(ticket.createdAt).format("DD/MM/YYYY HH:mm:ss")
                            const now = moment(ticket.comments[ticket.comments.length - 1].createdAt).format("DD/MM/YYYY HH:mm:ss")
                            return (
                                <Typography variant="inherit">
                                    {moment(ticket.comments[ticket.comments.length - 1].createdAt).format('LLL')}
                                    {/* {moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")} */}
                                </Typography>
                            );
                        }else{
                            return (
                                <Typography variant="inherit">Not yet closed</Typography>
                            );
                        }
                    }
                }
            },
            {
                name: "updatedAt",
                label: "Updated At",
                options: {
                    display: 'excluded',
                    filter: true,
                    sort: true,
                }
            },
            {
             name: "id",
             label: " ",
             options: {
                customBodyRender: id => {
                    return (
                        <IconButton
                            onClick={(ev, dispatch) => {
                                ev.stopPropagation();
                                this.handleRoute(id)
                            }}
                        >
                            <Icon>open_in_new</Icon>
                        </IconButton>
                    );
                },
             }
            }
        ]; 

        const options = {
            filter: true,
            filterType: 'checkbox',
            responsive: "stacked",
            selectableRows: 'none',
            customToolbar: () => {
                return (
                    <AddTicket
                        openComposeDialog={this.openComposeDialog}
                    />
                );
            },
            filter: false,
            print: false,
            download: false,
            viewColumns: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'ticketClosingList.csv', separator: ','},
        };

        return (
                <div className="">
                    <MUIDataTable
                        title={"Turn Around Time On Closing List"}
                        data={tickets}
                        columns={columns}
                        options={options}
                    />

                    <TicketsDialog
                        closeComposeDialog={this.closeComposeDialog}
                        composeDialog={this.state.composeDialog}
                    />
                    <CommentTicketDialog
                        closeCommentDialog={this.closeCommentDialog}
                        commentDialog={this.state.commentDialog}
                    />
                </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTickets: Actions.getTickets,
        getTicket : Actions.getTicket,
        openNewTicketDialog : Actions.openNewTicketDialog,
        openTicketEscalateDialog : Actions.openTicketEscalateDialog,
    }, dispatch)
}

const mapStateToProps = ({ticketsApp}) => {
    const { tickets } = ticketsApp
    return {
        tickets: tickets.data,
        ticket : tickets.ticket,
    }
}

export default withRouter(withReducer("ticketsApp", reducer)(connect(mapStateToProps, mapDispatchToProps)(ClosingList)));