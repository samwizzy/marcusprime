import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Tooltip,
    withStyles
} from '@material-ui/core';

const rows = [
    {
        id            : 'report-name',
        align         : 'left',
        disablePadding: false,
        label         : 'Report List',
        sort          : true
    }
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class ReportsTableHead extends Component {

    state = {
        selectedOrdersMenu: null
    };

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    openSelectedOrdersMenu = (event) => {
        this.setState({selectedOrdersMenu: event.currentTarget});
    };

    closeSelectedOrdersMenu = () => {
        this.setState({selectedOrdersMenu: null});
    };

    updateSelectedAdminsStatus = (selected) => {
        this.setState({selectedOrdersMenu: null});
        selected.map(selectId => this.props.updateAdminStatus(selectId))
        console.log(selected, "You have updated status");
    };

    editSelectedAdminUsers = (selected) => {
        this.setState({selectedOrdersMenu: null});
    };

    deleteSelectedAdminUsers = (selected) => {
        this.setState({selectedOrdersMenu: null});
        selected.map(selectId => this.props.deleteAdmin(selectId))
        console.log(selected, "You have deleted");
    };

    render()
    {
        const { order, orderBy, classes} = this.props;
        const {selectedOrdersMenu} = this.state;

        return (
            <TableHead>
                <TableRow className="h-64">
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                align={row.align}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                {row.sort && (
                                    <Tooltip
                                        title="Sort"
                                        placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
}

export default withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(ReportsTableHead));
