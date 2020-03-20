import React, {Component} from 'react';
import {withStyles, List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '../../../../../../@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as Actions from '../../../store/actions';
import CommentListItem from './CommentListItem';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.primary[500]
    }
});

class CommentList extends Component {

    componentDidMount()
    {
        console.log(this.props.match.params, "Mail Ticket")
        this.props.getMails(this.props.match.params);
        // this.props.getTicket(this.props.match.params.ticketId)
        this.props.getTicket(1)
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getMails(this.props.match.params);
        }
    }

    getFilteredArray = (ticket, searchText) => {
        if ( searchText.length === 0 )
        {
            return ticket.comments;
        }
        return FuseUtils.filterArrayByString(ticket.comments, searchText);
    };

    render()
    {
        const {mails, ticket, searchText} = this.props;

        const arr = this.getFilteredArray(ticket, searchText);

        if (arr && arr.length === 0 )
        {
            return (
                <FuseAnimate delay={100}>
                    <div className="flex flex-1 items-center justify-center h-full">
                        <Typography color="textSecondary" variant="h5">
                            There are no comments!
                        </Typography>
                    </div>
                </FuseAnimate>
            );
        }

        return (
            <List className="p-0">
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    {
                        arr && arr.map((comment) => (
                                <CommentListItem comment={comment} key={comment.id}/>
                            )
                        )
                    }
                </FuseAnimateGroup>
            </List>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getMails: Actions.getMails,
        getTicket : Actions.getTicket,
    }, dispatch);
}

function mapStateToProps({mailApp})
{
    const { tickets } = mailApp
    console.log(mailApp, "Store")
    return {
        mails     : mailApp.mails.entities,
        searchText: mailApp.mails.searchText,
        ticket    : tickets.ticket
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentList)));
