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
    const { getTransactions, getTransfers, classes } = this.props;

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
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);