import React, {Component} from 'react';
import {withStyles, Button, Table, TableBody, TableCell, TablePagination, TableRow, Switch, Checkbox} from '@material-ui/core';
import {FuseScrollbars, FuseUtils} from '../../../../@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import AdminsTableHead from './AdminsTableHead';
import AdminStatus from '../admin/AdminStatus';
import AdminsDialog from '../admins/AdminsDialog';
import Loader from 'react-loader-spinner'
import * as Actions from '../store/actions';

const pathToRegexp = require('path-to-regexp');

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
})

class AdminsTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : 'id',
        selected   : [],
        data       : [],
        admins     : this.props.admins,
        page       : 0,
        rowsPerPage: 25,
        enabled: true
    };

    componentDidMount()
    {
        this.props.getAdmins();
        this.props.getRoles();
        this.props.getDepartments();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.admins, prevProps.admins) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.admins, this.props.searchText);
            this.setState({data})
        }

        if ( !_.isEqual(this.props.admins, prevProps.admins) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const admins = this.getFilteredArray(this.props.admins, this.props.searchText);
            this.setState({admins})
        }
    }

    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, searchText);
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if ( this.state.orderBy === property && this.state.order === 'desc' )
        {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    handleSelectAllClick = event => {
        if ( event.target.checked )
        {
            this.setState(state => ({selected: state.data.map(n => n.adUserID)}));
            return;
        }
        this.setState({selected: []});
    };


    handleCheck = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleStatusChange = (enabled, adUserID) => {
        const params = { enable: enabled? false: true, userId: adUserID }
        this.props.updateAdminStatus(params)
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data, admins} = this.state;
        const { classes, deleteAdmin, openEditUserDialog, history, match, admin, rights, user } = this.props;
        const { enabled } = this.state;
        const toPath = pathToRegexp.compile(match.path);
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Admin Users'; });

        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    {admins && admins.length > 0? 
                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <AdminsTableHead
                            selected={selected}
                            deleteAdmin={deleteAdmin}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={admins.length}
                        />

                        
                        <TableBody>
                            {
                                _.orderBy(admins, [
                                    (o) => {
                                        switch ( orderBy )
                                        {
                                            case 'id':
                                            {
                                                return parseInt(o.adUserID, 10);
                                            }
                                            case 'firstname':
                                            {
                                                return o.firstName;
                                            }
                                            case 'lastname':
                                            {
                                                return o.lastName;
                                            }
                                            case 'role':
                                            {
                                                return o.role.name;
                                            }
                                            case 'email':
                                            {
                                                return o.email;
                                            }
                                            case 'department':
                                            {
                                                return o.department;
                                            }
                                            default:
                                            {
                                                return o[orderBy];
                                            }
                                        }
                                    }
                                ], [order])
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        const isSelected = this.isSelected(n.adUserID);
                                        return (
                                            <TableRow
                                                className="h-64 cursor-pointer"
                                                hover
                                                onClick={(ev) => history.push(toPath(
                                                    {
                                                        ...match.params,
                                                        id: n.adUserID? n.adUserID : null
                                                    }
                                                ))}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.adUserID}
                                                selected={isSelected}
                                            >
                                                <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onClick={event => event.stopPropagation()}
                                                        onChange={event => this.handleCheck(event, n.adUserID)}
                                                    />
                                                </TableCell>

                                                <TableCell className="truncate" component="th" scope="row">
                                                    {n.firstName}
                                                </TableCell>

                                                <TableCell className="truncate" component="th" scope="row">
                                                    {n.lastName}
                                                </TableCell>

                                                <TableCell component="th" scope="row" align="left">
                                                    {n.email}
                                                </TableCell>

                                                <TableCell component="th" scope="row" align="left">
                                                    {n.department}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    <Switch
                                                        checked={n.enable}
                                                        onChange={() => this.handleStatusChange(n.enable, n.adUserID)}
                                                        onClick={event => event.stopPropagation()}
                                                        disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                                                        value="enable"
                                                        color="secondary"
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    <AdminStatus name={n.role !== null ?n.role.name : 'Staff'}/>
                                                </TableCell>

                                                <TableCell component="th" scope="row">

                                                    {/* <AdminsDialog form={n} /> */}

                                                    <Button
                                                        style={{zIndex: 9999}}
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                                                        aria-label="More"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        onClick={(event) => {
                                                            openEditUserDialog(n.adUserID)
                                                            event.stopPropagation()
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>

                                                    
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                    :
                    <div className={classes.root}>
                        <Loader type="Oval" color="#039be5" height={60} width={60} timeout={5000} />
                    </div>
                    }
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={admins.length}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[25,50,100]}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />

                <AdminsDialog form={admin} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getRoles: Actions.getRoles,
        getAdmins: Actions.getAdmins,
        deleteAdmin: Actions.deleteAdmin,
        updateAdminStatus: Actions.updateAdminStatus,
        getDepartments: Actions.getDepartments,
        openEditUserDialog: Actions.openEditUserDialog,
    }, dispatch);
}

function mapStateToProps({adminApp, auth})
{
    console.log(adminApp, "Admin App")
    return {
        roles     : adminApp.admins.roles,
        admins    : adminApp.admins.data,
        admin     : adminApp.admins.admin,
        searchText: adminApp.admins.searchText,
        user: auth.user.data,
        rights    : auth.rights.right.rights,
    }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdminsTable)));
