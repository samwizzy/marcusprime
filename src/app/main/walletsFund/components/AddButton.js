import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default function AddButton({ openComposeDialog, canCreate }){
    return (
      <React.Fragment>
        <Tooltip title={"New Document Type"}>
          <IconButton disabled={!canCreate} onClick={() => {
            openComposeDialog()
          }}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
}