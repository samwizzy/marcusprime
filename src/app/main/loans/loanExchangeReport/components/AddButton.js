import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {
  },
};

class CustomToolbar extends React.Component {
  
  handleClick = () => {
    console.log("clicked on icon!");
  }

  render() {
    const { openNewRateDialog, classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"custom icon"}>
          {/* <IconButton className={classes.iconButton} onClick={this.handleClick}> */}
          <IconButton className={classes.iconButton} onClick={openNewRateDialog}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);