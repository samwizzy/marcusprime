import React from 'react';
import {withStyles, Avatar, Typography, Checkbox, ListItem} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import * as Actions from '../../store/actions';

const pathToRegexp = require('path-to-regexp');

const styles = theme => ({
    mailItem: {
        borderBottom: '1px solid  ' + theme.palette.divider,

        '&.unread'  : {
            background: 'rgba(0,0,0,0.03)'
        },
        '&.selected': {
            '&::after': {
                content        : '""',
                position       : 'absolute',
                left           : 0,
                display        : 'block',
                height         : '100%',
                width          : 3,
                backgroundColor: theme.palette.primary.main
            }
        }
    },
    avatar  : {
        backgroundColor: theme.palette.primary[500]
    }
});

const CommentsListItem = ({comment, classes, match, history, getAdmins, admins, selectedCommentIds, toggleInSelectedComments}) => {
    const toPath = pathToRegexp.compile(match.path);
    const checked = selectedCommentIds.length > 0 && selectedCommentIds.find(id => id === comment.id) !== undefined;
    const admin = admins && admins.find(admin => admin.adUserID === comment.adminUserId)

    console.log(admin, "Admnistartor obbject")

    return (
        <ListItem
            dense
            button
            onClick={() => history.push(toPath(
                {
                    ...match.params,
                    id: comment.id
                }
            ))}
            className={classNames(classes.mailItem, checked && "selected", !comment.read && "unread", "py-16 pl-0 pr-8 sm:pl-8 sm:pr-24")}>

            <Checkbox
                tabIndex={-1}
                disableRipple
                checked={checked}
                onChange={() => toggleInSelectedComments(comment.id)}
                onClick={(ev) => ev.stopPropagation()}
            />

            <div className="flex flex-1 flex-col relative overflow-hidden">

                <div className="flex items-center justify-between px-16 pb-8">
                    <div className="flex items-center">
                        <Typography variant="subtitle1">{comment.comment}</Typography>
                    </div>
                    <Typography variant="subtitle1">{moment(comment.createdAt).format('LLL')}</Typography>
                </div>

                <div className="flex flex-col px-16 py-0">
                    {admin && 
                    <React.Fragment>
                        <Typography color="textSecondary" className="truncate"><strong>Commented by:</strong> {_.truncate(admin.email.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}</Typography>
                        <Typography color="textSecondary" className="truncate"><strong>From:</strong> {admin.department}</Typography>
                        <Typography className="truncate">{admin.firstName} {admin.lastName}</Typography>
                    </React.Fragment>
                    }
                </div>

                <div className="flex justify-end">
                    
                </div>
            </div>

        </ListItem>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleInSelectedComments: Actions.toggleInSelectedComments,
    }, dispatch);
}

function mapStateToProps({ticketsApp})
{
    console.log(ticketsApp, "Ticket App Formulation")
    return {
        selectedCommentIds : ticketsApp.tickets.selectedCommentIds,
        admins             : ticketsApp.admins.data,
        labels             : ticketsApp.labels,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsListItem)));
