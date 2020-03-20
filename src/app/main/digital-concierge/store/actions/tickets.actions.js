import axios from 'axios';
import * as Actions from './';
import {showMessage} from '../../../../store/actions/fuse';

export const NEW_TICKET = '[TICKET APP] NEW TICKET';
export const NEW_COMMENT = '[TICKET APP] NEW COMMENT';
export const GET_TICKET = '[TICKET APP] GET TICKET';
export const GET_COMMENT = '[TICKET APP] GET COMMENT';
export const GET_TICKETS = '[TICKET APP] GET TICKETS';
export const CLOSE_TICKET_DIALOG = '[TICKET APP] CLOSE TICKET DIALOG';
export const CLOSE_COMMENT_DIALOG = '[TICKET APP] CLOSE COMMENT DIALOG';
export const OPEN_COMMENT_FORM = '[TICKET APP] OPEN TICKET COMMENT FORM';
export const OPEN_ESCALATE_TICKET_DIALOG = '[TICKET APP] OPEN ESCALATE TICKET DIALOG';
export const OPEN_TICKET_STATUS_DIALOG = '[TICKET APP] OPEN STATUS TICKET DIALOG';
export const TICKETS_BY_STATUS = '[TICKET APP] TICKET BY STATUS';
export const TICKETS_BY_NEW_STATUS = '[TICKET APP] TICKET BY NEW STATUS';
export const TICKETS_BY_PROGRESS_STATUS = '[TICKET APP] TICKET BY PROGRESS STATUS';
export const TICKETS_BY_CLOSED_STATUS = '[TICKET APP] TICKET BY CLOSED STATUS';
export const CREATE_TICKET = '[TICKET APP] CREATE TICKET';
export const ESCALATE_TICKET = '[TICKET APP] ESCALATE TICKET';
export const COMMENT_TICKET = '[TICKET APP] COMMENT TICKET';
export const TOGGLE_IN_SELECTED_COMMENTS = '[TICKET APP] TOGGLE IN SELECTED COMMENTS';
export const SELECT_ALL_COMMENTS = '[TICKET APP] SELECT ALL COMMENTS';
export const DESELECT_ALL_COMMENTS = '[TICKET APP] DESELECT ALL COMMENTS';
export const SAVE_TICKET = '[TICKET APP] SAVE TICKET';
export const UPDATE_TICKET = '[TICKET APP] UPDATE TICKET';
export const UPDATE_STATUS = '[TICKET APP] UPDATE STATUS';
export const DELETE_STATUS = '[TICKET APP] DELETE TICKET';
export const TICKET_SUCCESS = '[TICKET APP] TICKET SUCCESS';
export const TICKET_ERROR = '[TICKET APP] TICKET ERROR';
export const GET_WIDGETS = '[PROJECT DASHBOARD APP] GET WIDGETS';
export const GET_PROJECTS = '[PROJECT DASHBOARD APP] GET PROJECTS';


export function getTickets()
{
    const request = axios.get('conciergeserv/api/v1/tickets');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_TICKETS,
                payload: response.data
            })
        );
}

export function getWidgets()
{
    const request = axios.get('/api/ticket-dashboard-app/widgets');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WIDGETS,
                payload: response.data
            })
        );
}

export function getProjects()
{
    const request = axios.get('/api/project-dashboard-app/projects');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROJECTS,
                payload: response.data
            })
        );
}

export function getTicket(id)
{
    const request = axios.get('conciergeserv/api/v1/tickets/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_TICKET,
                mode: "update",
                payload: response.data
            })
        );
}

export function getComment(id)
{
    const request = axios.get('conciergeserv/api/v1/comments/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_COMMENT,
                payload: response.data
            })
        );
}

export function openUpdateTicketDialog(id)
{
    const request = axios.get('conciergeserv/api/v1/tickets/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_TICKET,
                mode: "update",
                payload: response.data,
                status: true
            })
        );
}

export function openTicketStatusDialog(id)
{
    const request = axios.get('conciergeserv/api/v1/tickets/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : OPEN_TICKET_STATUS_DIALOG,
                mode: "update",
                payload: response.data,
                status: true
            })
        );
}

export function openTicketEscalateDialog(id)
{
    const request = axios.get('conciergeserv/api/v1/tickets/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : OPEN_ESCALATE_TICKET_DIALOG,
                mode: "escalate",
                payload: response.data,
                status: true
            })
        );
}

export function saveTicket(data)
{
    const request = axios.get('conciergeserv/api/v1/tickets', data);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SAVE_TICKET,
                payload: response.data
            })
        );
}

export function updateTicketStatus(data)
{
    const request = axios.put('conciergeserv/api/v1/ticket/update', data);

    return (dispatch) =>

        request.then((response) => {
            dispatch(showMessage({message: 'Ticket Status Successfully Updated'}))

            Promise.all([
                dispatch({
                    type   : UPDATE_STATUS,
                    payload: response.data,
                    status: false
                })
            ]).then(() => dispatch(Actions.getTickets()))
        });
}

export function findTicketsByStatus(status)
{
    const request = axios.get('conciergeserv/api/v1/ticket/find_by_status', {
        params: {
          status
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : TICKETS_BY_STATUS,
                payload: response.data
            })
        );
}

export function ticketsByNewStatus(status)
{
    const request = axios.get('conciergeserv/api/v1/ticket/find_by_status', {
        params: {
          status
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : TICKETS_BY_NEW_STATUS,
                payload: response.data
            })
        );
}

export function ticketsByProgressStatus(status)
{
    const request = axios.get('conciergeserv/api/v1/ticket/find_by_status', {
        params: {
          status
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : TICKETS_BY_PROGRESS_STATUS,
                payload: response.data
            })
        );
}

export function ticketsByClosedStatus(status)
{
    const request = axios.get('conciergeserv/api/v1/ticket/find_by_status', {
        params: {
          status
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : TICKETS_BY_CLOSED_STATUS,
                payload: response.data
            })
        );
}

export function commentTicket(data)
{
    delete data.dept
    const { ticketId } = data
    const request = axios.put('conciergeserv/api/v1/ticket/add_comment', data);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'Ticket has been commented Successfully'}))
            Promise.all([
                dispatch({
                    type   : COMMENT_TICKET,
                    payload: response.data
                })
            ]).then(() => dispatch(Actions.getTicket(ticketId)))
        });
}

export function openCommentForm(id)
{
    const request = axios.get('conciergeserv/api/v1/tickets/' + id);

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type   : OPEN_COMMENT_FORM,
                payload: response.data,
                mode: "comment"
            })
        );
}

export function openNewTicketDialog()
{
    return (dispatch) =>
        dispatch({
            type   : NEW_TICKET,
            mode: "new",
            status: true
        })
}

export function closeTicketDialog()
{
    return (dispatch) =>
        dispatch({
            type   : CLOSE_TICKET_DIALOG,
            mode: "",
            status: false
        })
}

export function openNewCommentDialog()
{
    return (dispatch) =>
        dispatch({
            type: NEW_COMMENT,
            mode: "new",
            status: true
        })
}

export function closeCommentDialog()
{
    return (dispatch) =>
        dispatch({
            type: CLOSE_COMMENT_DIALOG,
            mode: "",
            status: false
        })
}

export function escalateTicket(data)
{
    const request = axios.put('conciergeserv/api/v1/ticket/escalate', data);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({message: 'Ticket has been escalated Successfully'}))

            dispatch({
                type   : ESCALATE_TICKET,
                payload: response.data
            })
        });
}

export function createTicket(data)
{
    const request = axios.post('conciergeserv/api/v1/tickets/add', data);

    return (dispatch) => {
        
        request.then((response) => {
            if(response.status === 200 && response.statusText === "OK"){
                dispatch(showMessage({message: 'Ticket Successfully Created'}));

                Promise.all([
                    dispatch({
                        type  : TICKET_SUCCESS,
                        status: false
                    })
                ]).then(() => dispatch(Actions.getTickets()))
            }else{
                dispatch({
                    type   : TICKET_ERROR,
                    payload: { message: "Ticket failed to add" }
                })
            }
        });
    }
}

export function toggleInSelectedComments(commentId)
{
    return {
        type: TOGGLE_IN_SELECTED_COMMENTS,
        commentId
    }
}

export function selectAllComments()
{
    return {
        type: SELECT_ALL_COMMENTS
    }
}

export function deselectAllComments()
{
    return {
        type: DESELECT_ALL_COMMENTS
    }
}