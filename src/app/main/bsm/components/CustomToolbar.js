import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarSelectStyles = {
  iconButton: {
    marginRight: "24px",
    top: "50%",
    display: "inline-block",
    position: "relative",
  },
  deleteIcon: {
    color: "#000",
  },
};

class CustomToolbar extends React.Component {

  handleDelete = () => {}

  render() {
    const { classes } = this.props;

    return (
      <div className={"custom-toolbar-select"}>
        <Tooltip title={"Delete PTA"}>
          <IconButton className={classes.iconButton} onClick={this.handleDelete}>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
}

const mapStateToProps = ({ptaApp}) => {
    return{
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(defaultToolbarSelectStyles, { name: "CustomToolbar" })(CustomToolbar));