import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export function AddButton({ openComposeDialog }){
    return (
      <React.Fragment>
        <Tooltip title={"New Ticket"}>
          <IconButton onClick={() => {
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