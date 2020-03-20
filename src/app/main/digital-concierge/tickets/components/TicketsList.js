import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MUIDataTable from 'mui-datatables'
import { FuseAnimate } from '../../../../../@fuse';
import { withRouter } from 'react-router-dom';
import withReducer from '../../../../../app/store/withReducer';
import reducer from '../../store/reducers';
import { withStyles, Icon, IconButton, Typography } from '@material-ui/core'
import * as Actions from '../../store/actions'
import { AddTicket } from './AddButton'
import TicketsDialog from './TicketsDialog'
import CommentTicketDialog from './CommentTicketDialog'
import Loader from 'react-loader-spinner'
import moment from 'moment';
import _ from 'lodash'

const styles = theme => ({
    root: {
        maxWidth: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
});

class TicketsList extends React.Component {
    state = {
        data: [],
        composeDialog: false,
        commentDialog: false,
    }

    componentDidMount(){}

    openNewComposeDialog = () => {
        this.setState({composeDialog: true});
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

        const { classes, tickets, openNewTicketDialog, getTickets, findTicketsByStatus, rights, user } = this.props
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Tickets'; });

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
                name: "description",
                label: "Description",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "severity",
                label: "Severity",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: status => {
                        if(status === 0)
                            return (
                                <Typography variant="inherit">Low</Typography>
                            )
                        else if(status === 1)
                            return (
                                <Typography variant="inherit">Normal</Typography>
                            )
                        else if(status === 2)
                            return (
                                <Typography variant="inherit">High</Typography>
                            )
                        else if(status === 3)
                            return (
                                <Typography variant="inherit">Urgent</Typography>
                            )
                        else
                            return (
                                <Typography variant="inherit">None</Typography>
                            )
                    },
                }
            },
            {
                name: "status",
                label: "Status",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: status => {
                        if(status === 0)
                            return (
                                <Typography variant="inherit">New</Typography>
                            )
                        else if(status === 1)
                            return (
                                <Typography variant="inherit">In-Progress</Typography>
                            )
                        else
                            return (
                                <Typography variant="inherit">Closed</Typography>
                            )
                    },
                }
            },
            {
                name: "id",
                label: "Comment",
                options: {
                    display: 'excluded',
                    customBodyRender: id => {
                        return (
                            <IconButton
                                onClick={(ev, dispatch) => {
                                    ev.stopPropagation();
                                    this.props.getTicket(id);
                                    this.openCommentDialog();
                                }}
                            >
                                <Icon>comment</Icon>
                            </IconButton>
                        );
                    },
                }
            },
            {
                name: "createdAt",
                label: "Date Created",
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
            },
            {
             name: "id",
             label: "Escalate",
             options: {
                display: 'excluded',
                customBodyRender: id => {
                    return (
                        <IconButton
                            onClick={(ev, dispatch) => {
                                ev.stopPropagation();
                                this.props.openTicketEscalateDialog(id);
                                this.openCommentDialog();
                            }}
                        >
                            <Icon>call_split</Icon>
                        </IconButton>
                    );
                },
             }
            }
        ];        

        const options = {
            filter: true,
            filterType: 'dropdown',
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
                        openComposeDialog={openNewTicketDialog}
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
            downloadOptions: {filename: 'ticketsList.csv', separator: ','},  
        };

        return (
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <React.Fragment>
                        <MUIDataTable
                            title={"Tickets List"}
                            data={tickets}
                            columns={columns}
                            options={options}
                        />

                        <TicketsDialog />
                        <CommentTicketDialog
                            closeCommentDialog={this.closeCommentDialog}
                            commentDialog={this.state.commentDialog}
                        />
                    </React.Fragment>
                </FuseAnimate>
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

export default withRouter(withReducer("ticketsApp", reducer)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TicketsList))));