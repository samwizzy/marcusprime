import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import * as Actions from './../../store/actions'
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarSelectStyles = {
  iconButton: {
    marginRight: "24px",
    top: "50%",
    display: "inline-block",
    position: "relative",
  },
  deleteIcon: {
    color: "#888",
  },
};

class CustomToolbar extends React.Component {

  handleDelete = () => {
    const { data } = this.props.selectedRows;
    data.map(d => {
        const id = d.index;
        const department = this.props.departments[id];
        console.log(department, "Role Deleted");
        this.props.deleteDepartment(department.id);
        console.log(this.props.departments, "After roles deletion")
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={"custom-toolbar-select"}>
        <Tooltip title={"delete department"}>
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
        deleteDepartment: Actions.deleteDepartment,
        getDepartments: Actions.getDepartments
    }, dispatch)
}

const mapStateToProps = ({departmentApp}) => {
    const { department } = departmentApp
    return{
        departments: department.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(defaultToolbarSelectStyles, { name: "CustomToolbar" })(CustomToolbar));