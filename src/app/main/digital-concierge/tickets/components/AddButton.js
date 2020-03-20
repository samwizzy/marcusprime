import React from "react";
import { Button, IconButton, Tooltip, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export function AddTicket({ openComposeDialog, openNewTicketDialog, getTickets, canCreate, findTicketsByStatus }){
    return (
      <React.Fragment>
        <Tooltip title={"All Tickets"}>
          <Button onClick={() => {
            getTickets()
          }}>
            <Typography variant="caption">All Tickets</Typography>
          </Button>
        </Tooltip>
        <Tooltip title={"New Ticket"}>
          <Button onClick={() => {
            findTicketsByStatus(0)
          }}>
            <Typography variant="caption">New Ticket</Typography>
          </Button>
        </Tooltip>
        <Tooltip title={"In-Progress Ticket"}>
          <Button onClick={() => {
            findTicketsByStatus(1)
          }}>
            <Typography variant="caption">In-Progress Ticket</Typography>
          </Button>
        </Tooltip>
        <Tooltip title={"Closed Ticket"}>
          <Button onClick={() => {
            findTicketsByStatus(2)
          }}>
            <Typography variant="caption">Closed Ticket</Typography>
          </Button>
        </Tooltip>
        <Tooltip title={"Create Ticket"}>
          <IconButton disabled={!canCreate} onClick={() => {
            openComposeDialog()
          }}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
}

export function AddComment({ openCommentDialog }){
  return (
    <React.Fragment>
      <Tooltip title={"Add Comment"}>
        <IconButton onClick={() => openCommentDialog()}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}