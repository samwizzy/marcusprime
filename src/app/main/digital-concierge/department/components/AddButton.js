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
    const { openNewDepartmentDialog, classes, canCreate } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"New Department"}>
          <IconButton disabled={!canCreate} className={classes.iconButton} onClick={() => openNewDepartmentDialog()}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);