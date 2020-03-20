import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {
  },
};

class CustomToolbar extends React.Component {
  render() {
    const { openNewRoleDialog, newRole, classes, canCreate } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"New Role"}>
          <IconButton disabled={!canCreate} onClick={() => {
              openNewRoleDialog() 
              newRole()
            } }>
            <AddIcon/>
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);