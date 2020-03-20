import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { Button, IconButton, Tooltip, Typography, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import * as Actions from './../store/actions';
import classNames from 'classnames'
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


// const date = new Date();
// let dd = date.getDate();
// let mm = date.getMonth() + 1; //January is 0!
// let yyyy = date.getFullYear();


// const current = yyyy + '-' + mm  + '-' + dd;

class CustomToolbar extends React.Component {

  state = {
    startDate: '2020-02-11',
    endDate: '2019-12-10',
  }

  componentDidMount(){
    this.handleCurrentDate()
  }

  handleCurrentDate = () => {
    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!
    let yyyy = date.getFullYear();

    dd = dd.length > 1? dd : dd.toString().padStart(2, '0')
    mm = mm.length > 1? mm : mm.toString().padStart(2, '0')
    const current = yyyy + '-' + mm  + '-' + dd;

    this.setState({...this.state, 'startDate': current, 'endDate': current});
  }

  handleChange = (event) => {
    this.setState(_.set({...this.state}, event.target.name, event.target.value))
  }

  render() {
    const { classes, getTransferLogByDate, transferLogs, canCreate } = this.props;
    const { startDate, endDate } = this.state;

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

          <Button type="submit" variant="contained" color="primary" onClick={() => getTransferLogByDate(transferLogs, this.state)} className={classNames(classes.button, "mt-8 mb-16")}>
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
    getTransferLogByDate: Actions.getTransferLogByDate
  }, dispatch);
}

function mapStateToProps({ glTransferApp, auth }) {
  const { transferLog } = glTransferApp
  return { 
    transferLogs: transferLog.data
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomToolbar)));