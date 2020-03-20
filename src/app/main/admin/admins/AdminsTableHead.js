import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import AdminDialog from './../admin/AdminDialog';

import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Checkbox,
    Tooltip,
    IconButton,
    Icon,
    Menu,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from '@material-ui/core';
import classNames from 'classnames';

const rows = [
    {
        id            : 'firstname',
        align         : 'left',
        disablePadding: false,
        label         : 'First Name',
        sort          : true
    },
    {
        id            : 'lastname',
        align         : 'left',
        disablePadding: false,
        label         : 'Last Name',
        sort          : true
    },
    {
        id            : 'email',
        align         : 'left',
        disablePadding: false,
        label         : 'Email',
        sort          : true
    },
    {
        id            : 'department',
        align         : 'left',
        disablePadding: false,
        label         : 'Department',
        sort          : true
    },
    {
        id            : 'status',
        align         : 'left',
        disablePadding: false,
        label         : 'Status',
        sort          : true
    },
    {
        id            : 'role',
        align         : 'left',
        disablePadding: false,
        label         : 'Role',
        sort          : false
    },
    {
        id            : 'action',
        align         : 'left',
        disablePadding: false,
        label         : 'Action',
        sort          : true
    }
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class AdminsTableHead extends Component {

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
        const {onSelectAllClick, order, orderBy, selected, numSelected, rowCount, classes, openComposeDialog} = this.props;
        const {selectedOrdersMenu} = this.state;

        return (
            <TableHead>
                <TableRow className="h-64">
                    <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                        {numSelected > 0 && (
                            <div className={classNames("flex items-center justify-center absolute w-64 pin-t pin-l ml-68 h-64 z-10", classes.actionsButtonWrapper)}>
                                <IconButton
                                    aria-owns={selectedOrdersMenu ? 'selectedOrdersMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedOrdersMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedOrdersMenu"
                                    anchorEl={selectedOrdersMenu}
                                    open={Boolean(selectedOrdersMenu)}
                                    onClose={this.closeSelectedOrdersMenu}
                                >
                                    <MenuList>
                                        {/* <MenuItem
                                            onClick={() => {
                                                this.editSelectedAdminUsers(selected);
                                            }}
                                        >
                                            <ListItemIcon className={classes.icon}>
                                                <Icon>edit</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary="Edit"/>
                                        </MenuItem> */}
                                        <MenuItem
                                            onClick={() => {
                                                this.deleteSelectedAdminUsers(selected);
                                            }}
                                        >
                                            <ListItemIcon className={classes.icon}>
                                                <Icon>delete</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary="Remove"/>
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                this.updateSelectedAdminsStatus(selected);
                                            }}
                                        >
                                            <ListItemIcon className={classes.icon}>
                                                <Icon>check_box</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary="Enable/Disable"/>
                                        </MenuItem>
                                        <MenuItem
                                            onClick={openComposeDialog}
                                        >
                                            <ListItemIcon className={classes.icon}>
                                                <Icon>check_box</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary="Assign roles"/>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        )}
                    </TableCell>
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
                <AdminDialog />
            </TableHead>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateAdminStatus: Actions.updateAdminStatus,
        openComposeDialog: Actions.openComposeDialog
    }, dispatch)
}

export default withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(AdminsTableHead));
