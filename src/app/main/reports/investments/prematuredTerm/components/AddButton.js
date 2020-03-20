import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import classNames from 'classnames'
import { Button, IconButton, Tooltip, TextField, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import * as Actions from '../../../store/actions';
import { withStyles } from "@material-ui/core/styles";
import moment from 'moment'

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

  render() {
    const { getCalypsoBatchs, getPrematuredInvestment, getPrematuredByDate, transactions, classes } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <React.Fragment>
        <Tooltip title={"All Investments"}>
          <Button className={classes.iconButton} onClick={() => getCalypsoBatchs()}>
            <Typography variant="caption">All Investments</Typography>
          </Button>
        </Tooltip>
        <Tooltip title={"Buy"}>
          <Button className={classes.iconButton} onClick={() => getPrematuredInvestment({value: 'buy'})}>
            <Typography variant="caption">By Product Bought</Typography>
          </Button>
        </Tooltip>
        <Tooltip title={"Sell"}>
          <Button className={classes.iconButton} onClick={() => getPrematuredInvestment({value: 'sell'})}>
            <Typography variant="caption">By Product Sold</Typography>
          </Button>
        </Tooltip>
        <Tooltip title={"Date Range"}>
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

            <Button type="submit" variant="contained" color="primary" onClick={() => getPrematuredByDate(transactions, this.state)} className={classNames(classes.button, "mt-8 mb-16")}>
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
    getPrematuredInvestment: Actions.getPrematuredInvestment,
    getPrematuredByDate: Actions.getPrematuredByDate,
  }, dispatch);
}

function mapStateToProps({ preMaturedApp, auth }) {
  return { 
    transactions: preMaturedApp.reports.prematured
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomToolbar)));