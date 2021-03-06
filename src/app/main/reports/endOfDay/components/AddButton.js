import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { Button, IconButton, Tooltip, Typography, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import * as Actions from './../../store/actions';
import classNames from 'classnames'
import moment from 'moment'
import _ from 'lodash'

const defaultToolbarStyles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
});

class CustomToolbar extends React.Component {

  state = {
    startDate: moment(new Date()).format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
  }

  handleChange = (event) => {
    this.setState(_.set({...this.state}, event.target.name, event.target.value))
  }

  render() {
    const { classes, getEndofDaysByDate, getEndOfDaysByCreatedDate, endofdays } = this.props;
    const { startDate, endDate } = this.state;

    console.log(this.state, "This state Date");

    return (
      <React.Fragment>
        <Tooltip title={"Date filter"}>
          <div>
          <TextField
              className={classNames(classes.textField, "mt-8 mb-16")}
              label="Start Date"
              id="startDate"
              name="startDate"
              type="date"
              InputLabelProps={{
                  shrink: true,
              }}
              value={startDate}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
              required
          />
          <TextField
              className={classNames(classes.textField, "mt-8 mb-16")}
              label="End Date"
              id="endDate"
              name="endDate"
              type="date"
              InputLabelProps={{
                  shrink: true,
              }}
              value={endDate}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
              required
          />

          <Button type="submit" variant="contained" color="primary" onClick={() => getEndofDaysByDate(endofdays, this.state)} className={classNames(classes.button, "mt-8 mb-16")}>
              Search
          </Button>
          </div>
        </Tooltip>
        
      </React.Fragment>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getEndofDaysByDate: Actions.getEndofDaysByDate,
    getEndOfDaysByCreatedDate: Actions.getEndOfDaysByCreatedDate,
  }, dispatch);
}

function mapStateToProps({ endOfDayApp, auth }) {
  return { 
    endofdays: endOfDayApp.endofday.data
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomToolbar)));