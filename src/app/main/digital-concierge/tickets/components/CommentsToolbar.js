import React, {Component} from 'react';
import {Checkbox, Icon, IconButton, Button, Menu, MenuItem, Typography} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as Actions from '../../store/actions';
const pathToRegexp = require('path-to-regexp');

class CommentsToolbar extends Component {

    state = {
        selectMenu : null,
        foldersMenu: null,
        labelsMenu : null
    };

    handleMenuOpen = (event, menu) => {
        this.setState({[menu]: event.currentTarget});
    };

    handleMenuClose = (event, menu) => {
        this.setState({[menu]: null});
    };

    handleChange = () => event => {
        event.target.checked ? this.props.selectAllComments() : this.props.deselectAllComments();
    };

    render()
    {
        const {ticket, selectedCommentIds, openNewCommentDialog, openTicketStatusDialog, openTicketEscalateDialog, match, history} = this.props;
        const { params } = match
        const { ticketId } = params
        const {comments} = ticket;
        const {foldersMenu, selectMenu, labelsMenu} = this.state;

        // console.log(ticketId, "Select Ticket Id");
        // console.log(selectedCommentIds, "Select Mail Id");

        return (
            <div className="flex flex-1 items-center sm:px-8">


            <IconButton onClick={() => history.push('/apps/tickets')}>
                <Icon>arrow_back</Icon>
            </IconButton>

                {comments && comments.length > 0 && (
                <div>
                    
                <Checkbox
                    onChange={this.handleChange()}
                    checked={selectedCommentIds.length === Object.keys(comments).length && selectedCommentIds.length > 0}
                    indeterminate={selectedCommentIds.length !== Object.keys(comments).length && selectedCommentIds.length > 0}
                />

                <div className="border-r-1 h-48 w-1 mx-12 my-0"/>

                <Button
                    onClick={() => openNewCommentDialog()}
                    aria-label="comment"
                >
                    <Icon>comment</Icon> 
                    <Typography variant="body2" component="span">comment</Typography>
                </Button>

                <Button
                    onClick={() => openTicketStatusDialog(ticketId)}
                    aria-label="status"
                >
                    <Icon>toggle_off</Icon>
                    <Typography variant="body2" component="span">change status</Typography>
                </Button>

                <Button
                    onClick={() => openTicketEscalateDialog(ticketId)}
                    aria-label="escalate"
                >
                    <Icon>near_me</Icon>
                    <Typography variant="body2" component="span">escalate</Typography>
                </Button>
                </div>
                )}


                {selectedCommentIds.length > 0 && (
                    <React.Fragment>

                        <div className="border-r-1 h-48 w-1 mx-12 my-0"/>

                        <Button
                            // onClick={(ev) => setFolderOnSelectedMails(4)}
                            aria-label="Delete"
                        >
                            <Icon>delete</Icon>
                        </Button>

                    </React.Fragment>
                )}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        selectAllComments       : Actions.selectAllComments,
        deselectAllComments     : Actions.deselectAllComments,

        getTickets              : Actions.getTickets,
        getTicket               : Actions.getTicket,
        getDepartments          : Actions.getDepartments,
        openNewTicketDialog     : Actions.openNewTicketDialog,
        openNewCommentDialog    : Actions.openNewCommentDialog,
        openTicketStatusDialog  : Actions.openTicketStatusDialog,
        openUpdateTicketDialog  : Actions.openUpdateTicketDialog,
        openTicketEscalateDialog: Actions.openTicketEscalateDialog,
    }, dispatch);
}

function mapStateToProps({ticketsApp})
{
    return {
        ticket            : ticketsApp.tickets.ticket,
        selectedCommentIds: ticketsApp.tickets.selectedCommentIds,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsToolbar));
