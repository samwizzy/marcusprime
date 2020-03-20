import React from "react";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const defaultFooterStyles = {};

class CustomFooter extends React.Component {
  render() {
    const { classes, sumAmount } = this.props;

    const nf = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  });

    return (
      <TableFooter>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><b>Total Balance</b></TableCell>
          <TableCell><b>{nf.format(sumAmount)}</b></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    );
  }
}

export default withStyles(defaultFooterStyles, { name: "CustomFooter" })(
  CustomFooter
);
