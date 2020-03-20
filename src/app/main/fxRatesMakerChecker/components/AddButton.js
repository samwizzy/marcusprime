import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  iconButton: {}
}

class CustomToolbar extends React.Component {


  render() {
    const { openComposeDialog, classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"New FX Rate"}>
          <IconButton onClick={() => openComposeDialog()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(styles, { name: "CustomToolbar" })(CustomToolbar);