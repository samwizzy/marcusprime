import React, { Component } from 'react';
import { FormControlLabel, Switch, Typography, withStyles, Icon, IconButton } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import Loader from 'react-loader-spinner'
import * as Actions from '../store/actions';
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    root: {
        maxWidth: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    listItem: {
        color: 'inherit!important',
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
        '&.active': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText + '!important',
            pointerEvents: 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    }
});

class TncReportsLists extends Component {

    render() {
        const { users, classes, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Registrations'; });

        const columns = [
            {
                name: "id",
                label: "S/N",
                options: {
                    display: 'excluded',
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "firstName",
                label: "First Name",
                options: {
                    filter: true,
                    sort: false,
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
                name: "email",
                label: "Email",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "enable",
                label: "T&C Status",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: enable => {
                        return (
                            <IconButton>
                                {enable? <Icon>done</Icon>:<Icon>close</Icon>}
                            </IconButton>
                        );
                    },
                }
            },
            {
                name: "createdAt",
                label: "Date Accepted",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: createdAt => {
                        return (
                            <Typography variant="subtitle2">
                                {moment(createdAt).format('LLL')}
                            </Typography>
                        );
                    },
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scroll',
            selectableRows: 'none',
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'usersTAndCList.csv', separator: ','},
            filter: false
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                {users && users.length > 0?
                    <MUIDataTable
                        title={"Terms & Conditions Records"}
                        data={users}
                        columns={columns}
                        options={options}
                    />:
                    <div className={classes.root}>
                        <Loader type="Oval" color="#039be5" height={60} width={60} />
                    </div>
                }
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({ tncReportsApp, auth }) {
    const { accounts } = tncReportsApp
    return {
        users: accounts.users,
        user: auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TncReportsLists)));
