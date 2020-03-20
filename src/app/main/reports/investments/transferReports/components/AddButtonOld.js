import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import classNames from 'classnames'
import { Button, IconButton, Tooltip, TextField, Typography } from "@material-ui/core";
import * as Actions from '../../../store/actions';
import AddIcon from "@material-ui/icons/Add";
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
    const { transactions, getTransactions, getTransferByDate, getTransfers, classes } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <React.Fragment>
        <Tooltip title={"All Transactions"}>
          <Button className={classes.iconButton} onClick={() => getTransactions()}>
            <Typography variant="caption">All transactions</Typography>
          </Button>
        </Tooltip>
        <Tooltip title={"From Wallet"}>
          <Button className={classes.iconButton} onClick={() => getTransfers({type: 'Wallet Transfer'})}>
            <Typography variant="caption">Wallet Transfer</Typography>
          </Button>
        </Tooltip>
        <Tooltip title={"From Account"}>
          <Button className={classes.iconButton} onClick={() => getTransfers({type: 'Account Transfer'})}>
            <Typography variant="caption">Account Transfer</Typography>
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

            <Button type="submit" variant="contained" color="primary" onClick={() => getTransferByDate(transactions, this.state)} className={classNames(classes.button, "mt-8 mb-16")}>
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
    getTransferByDate: Actions.getTransferByDate
  }, dispatch);
}

function mapStateToProps({ transferReportsApp, auth }) {
  return { 
    transactions: transferReportsApp.reports.transactions
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomToolbar)));