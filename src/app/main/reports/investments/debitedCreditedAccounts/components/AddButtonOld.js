import React from "react";
import { Button, IconButton, Tooltip, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {
  },
};

class CustomToolbar extends React.Component {


  render() {
    const { getTransactions, getCreditsDebitsAccounts, classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"All Transactions"}>
          <Button className={classes.iconButton} onClick={() => getTransactions()}>
            <Typography variant="caption">All transactions</Typography>
          </Button>
        </Tooltip>
        <Tooltip title={"Credit"}>
          <Button className={classes.iconButton} onClick={() => getCreditsDebitsAccounts({direction: 'credit'})}>
            <Typography variant="caption">Credited transactions</Typography>
          </Button>
        </Tooltip>
        <Tooltip title={"Debit"}>
          <Button className={classes.iconButton} onClick={() => getCreditsDebitsAccounts({direction: 'debit'})}>
            <Typography variant="caption">Debited transactions</Typography>
          </Button>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);