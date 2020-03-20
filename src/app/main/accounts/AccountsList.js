import React, { Component } from 'react';
import { FormControlLabel, Switch, Icon, Button } from '@material-ui/core';
import { FuseAnimate } from '../../../@fuse';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import MUIDataTable from "mui-datatables";
import * as Actions from './store/actions';
import _ from 'lodash';
import Loader from 'react-loader-spinner';

class AccountsList extends Component {

    handleClick = uuid => {
        if (uuid) {
            this.props.history.push('/users/accounts/' + uuid);
        }
    };

    render() {
        const { users, rights, user, disableAccount, getUserProfileByUuid } = this.props;
        const data = _.orderBy(users, ['createdAt'], ['desc']);
        const r = _.find(rights, function(o) { return o.module.moduleName === 'User'; });

        const columns = [
            {
                name: "id",
                label: "S/N",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <FormControlLabel
                                label={tableMeta.rowIndex + 1}
                                control={
                                    <Icon></Icon>
                                }
                            />
                        );
                    }
                }
            },
            {
                name: "firstName",
                label: "First Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "lastName",
                label: "Last Name",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "username",
                label: "Username",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "phoneNumber",
                label: "Phone Number",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "email",
                label: "E-mail",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "id",
                label: "View",
                options: {
                    customBodyRender: value => {

                        const getUserID = users.find(user => user.id === value);

                        return (
                            <Button
                                color="primary"
                                disabled={!(r && r.canview || user.role && user.role.id === 1)}
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    getUserProfileByUuid(getUserID.uuid)
                                    this.handleClick(getUserID.uuid);
                                }}
                            >
                                view
                            </Button>
                        );

                    },
                }
            },
            {
                name: "id",
                label: "Active",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {

                        const getUserID = users.find(user => user.id === value);
                        return (
                            <FormControlLabel
                                label={value ? "Yes" : "No"}
                                value={value ? "Yes" : "No"}
                                control={
                                    <Switch
                                    color="primary" 
                                    disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                                    checked={getUserID.enable} value={getUserID.enable === true ? false : true} 
                                    />
                                }
                                onChange={(evt) => {
                                    disableAccount(getUserID.id, evt.target.value);
                                }}
                            />
                        );

                    }
                }
            }
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            rowsPerPage: 25,
            rowsPerPageOptions: [25, 50, 100],
            downloadOptions: { filename: 'customerList.csv', separator: ',' },
            filter: false,
            textLabels: {
                body: {
                    noMatch: <Loader type="Oval" color="#303030" height={50} width={50} timeout={5000} />,
                    toolTip: "Sort",
                    columnHeaderTooltip: column => `Sort for ${column.label}`
                }
            },
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"Customers List"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUsers: Actions.getUsers,
        getUserProfileByUuid: Actions.getUserProfileByUuid,
        disableAccount: Actions.disableAccount,
    }, dispatch);
}

function mapStateToProps({ accountsApp, auth }) {
    return {
        user: auth.user.data,
        rights: auth.rights.right.rights,
        users: accountsApp.accounts.users,
        getUserProfileByUuid: accountsApp.accounts.getUserProfileByUuid,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountsList));
