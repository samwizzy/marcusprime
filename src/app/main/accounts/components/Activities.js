import React, { Component } from 'react';
import { FormControlLabel, withStyles, Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../store/actions';
import moment from 'moment';
import _ from 'lodash';

const styles = theme => ({
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

class WalletsList extends Component {

    componentDidMount() {
        const { getUserActivityLogs, userProfileByUuid } = this.props;

        getUserActivityLogs(userProfileByUuid.id);
    }


    render() {
        const { userActivitiesLogs } = this.props;

        const data = _.orderBy(userActivitiesLogs, ['createdAt'], ['desc']);

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
                name: "description",
                label: "Description",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "createdAt",
                label: "Created Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        if (day === '') {
                            return ('')
                        } else {
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {moment(day).format('MMMM Do YYYY, h:mm:ss a')}
                                </Typography>
                            )
                        }
                    }
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>

                <div>
                    <MUIDataTable
                        title={"Activities Logs"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </div>

            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserActivityLogs: Actions.getUserActivityLogs,
        getUserProfileByUuid: Actions.getUserProfileByUuid,
    }, dispatch);
}

function mapStateToProps({ accountsApp }) {
    return {
        userActivitiesLogs: accountsApp.accounts.userActivitiesLogs,
        userProfileByUuid: accountsApp.accounts.userProfileByUuid,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletsList)));
