import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import * as Actions from './store/actions'
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

  handleDelete = () => {
    const { data } = this.props.selectedRows;
    // const id = data[0].index;
    console.log(data, "Data tables")
    data.map(d => {
        const id = d.index;
        const role = this.props.roles[id];
        console.log(role, "Role Deleted");
        this.props.deleteRole(role.id);
        console.log(this.props.roles, "After roles deletion")
    })
  }

  handleEdit = () => {
    const { data } = this.props.selectedRows;
    // const id = data[0].index;
    data.map(d => {
        const id = d.index;
        const role = this.props.roles[id];
        console.log(role, "Role Deleted");
        this.props.deleteRole(role.id);
        console.log(this.props.roles, "After roles deletion")
    })
  }

  render() {
    const { classes } = this.props;
    console.log(this.props, "Dammie");

    return (
      <div className={"custom-toolbar-select"}>
        <Tooltip title={"icon 2"}>
          <IconButton className={classes.iconButton} onClick={this.handleEdit}>
            <EditIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"icon 1"}>
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
        deleteRole: Actions.deleteRole,
        getRoles: Actions.getRoles
    }, dispatch)
}

const mapStateToProps = ({rolesApp}) => {
    console.log(rolesApp, "Table mapstate");
    const { roles } = rolesApp;
    return{
        roles: roles.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(defaultToolbarSelectStyles, { name: "CustomToolbar" })(CustomToolbar));