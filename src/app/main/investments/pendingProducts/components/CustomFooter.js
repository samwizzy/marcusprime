import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import { TablePagination, IconButton } from "@material-ui/core";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


const defaultFooterStyles = {};

class CustomFooter extends React.Component {

    handleFirstPageButtonClick = event => {
        this.props.changePage(event, 0);
    }

    handleBackButtonClick = event => {
        this.props.changePage(event, this.props.page - 1);
    }

    handleNextButtonClick = event => {
        this.props.changePage(event, this.props.page + 1);
    }

    handleLastPageButtonClick = event => {
        this.props.changePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
    }


    render() {

        let theme = createMuiTheme();
        // theme = responsiveFontSizes(theme);

        const { classes, sumAmount, count, changePage, page, rowsPerPage, changeRowsPerPage } = this.props;

        // console.log(count, 'count')
        // console.log(changePage, 'changePage')
        // console.log(page, 'page')
        // console.log(rowsPerPage, 'rowsPerPage')
        // console.log(changeRowsPerPage, 'changeRowsPerPage')

        // console.log(sumAmount, 'sumAmount')

        return (
            <TableFooter>
                <TableRow>
                    {/* <TableCell></TableCell>
                    <TableCell></TableCell> */}
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right"><b>Total Balance</b></TableCell>
                    <TableCell align="center"><b>NGN {sumAmount}</b></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                {/* <CustomPaginationActionsTable /> */}
                {/* <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={count.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={this.TablePaginationActions}
                    />
                </TableRow> */}
                {/* <div className={classes.root}>
                    <IconButton
                        onClick={this.handleFirstPageButtonClick}
                        disabled={page === 0}
                        aria-label="first page"
                    >
                        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                    </IconButton>
                    <IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    </IconButton>
                    <IconButton
                        onClick={this.handleNextButtonClick}
                        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                        aria-label="next page"
                    >
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </IconButton>
                    <IconButton
                        onClick={this.handleLastPageButtonClick}
                        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                        aria-label="last page"
                    >
                        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                    </IconButton>
                </div> */}
                {/* <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                /> */}
                {/* <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right"><b>Total Balance</b></TableCell>
                    <TableCell align="center"><b>NGN {sumAmount}</b></TableCell>
                    <TableCell></TableCell>
                </TableRow> */}
            </TableFooter>
        );
    }
}

export default withStyles(defaultFooterStyles, { name: "CustomFooter" })(
    CustomFooter
);
