import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MUIDataTable from 'mui-datatables'
import { withRouter } from 'react-router-dom';
import withReducer from '../../../../../app/store/withReducer';
import reducer from '../../store/reducers';
import { Icon, IconButton, Typography } from '@material-ui/core'
import * as Actions from '../../store/actions'
import { AddTicket } from './AddButton'
import TicketsDialog from './TicketsDialog'
import CommentTicketDialog from './CommentTicketDialog'
import Loader from 'react-loader-spinner'
import moment from 'moment';
import _ from 'lodash'

class ResponseList extends React.Component {
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

        const { tickets, getTickets, findTicketsByStatus, rights, user } = this.props
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Tickets'; });

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
                            const then = moment(ticket.createdAt).format("DD/MM/YYYY HH:mm:ss")
                            const now = moment(ticket.comments[0].createdAt).format("DD/MM/YYYY HH:mm:ss")
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
                            return (
                                <Typography variant="inherit">{moment(ticket.comments[ticket.comments.length - 1].createdAt).format('LLL')}</Typography>
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
            textLabels: {
                body: {
                    noMatch: <Loader type="Oval" color="#039be5" height={60} width={60} timeout={5000} />,
                    toolTip: "Sort",
                    columnHeaderTooltip: column => `Sort for ${column.label}`
                },
            },
            customToolbar: () => {
                return (
                    <AddTicket
                        canCreate={r && r.cancreate || user.role && user.role.id === 1 }
                        openComposeDialog={this.openComposeDialog}
                        getTickets={getTickets}
                        findTicketsByStatus={findTicketsByStatus}
                    />
                );
            },
            filter: false,
            print: false,
            download: false,
            viewColumns: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'ticketResponseList.csv', separator: ','},
        };

        return (
                <div className="">
                    <MUIDataTable
                        title={"Turn Around Time On Response List"}
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
        findTicketsByStatus : Actions.findTicketsByStatus,
    }, dispatch)
}

const mapStateToProps = ({ticketsApp, auth}) => {
    const { tickets } = ticketsApp
    return {
        tickets: tickets.data,
        ticket : tickets.ticket,
        user   : auth.user.data,
        rights : auth.rights.right.rights
    }
}

export default withRouter(withReducer("ticketsApp", reducer)(connect(mapStateToProps, mapDispatchToProps)(ResponseList)));