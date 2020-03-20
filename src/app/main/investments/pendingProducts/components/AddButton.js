import React from "react";
import { IconButton, Tooltip, Icon } from "@material-ui/core";
import { Add, CloudUpload, FindReplace } from "@material-ui/icons";
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
    const { openNewDialog, openNewMaturityUpload, openEditMaturityUpload, canCreate, classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"New Product"}>
          <IconButton disabled={!canCreate} className={classes.iconButton} onClick={openNewDialog}>
            <Add className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>

        <Tooltip title={"Maturity Upload"}>
          <IconButton className={classes.iconButton} onClick={openNewMaturityUpload}>
            <CloudUpload className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>

        <Tooltip title={"Update Maturity Upload"}>
          <IconButton className={classes.iconButton} onClick={openEditMaturityUpload}>
            <FindReplace className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);