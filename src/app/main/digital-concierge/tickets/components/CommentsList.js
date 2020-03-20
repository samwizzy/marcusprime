import React, {Component} from 'react';
import {withStyles, List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '../../../../../@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as Actions from '../../store/actions';
import CommentsListItem from './CommentsListItem';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.primary[500]
    }
});

class CommentsList extends Component {

    componentDidMount(){}

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getTicket(this.props.match.params);
        }
    }

    getFilteredArray = (comments, searchText) => {
        if ( searchText.length === 0 )
        {
            return comments;
        }
        return FuseUtils.filterArrayByString(comments, searchText);
    };

    render()
    {
        const {searchText, comments} = this.props;

        const all = this.getFilteredArray(comments, searchText);

        if ( all.length === 0 )
        {
            return (
                <FuseAnimate delay={100}>
                    <div className="flex flex-1 items-center justify-center h-full">
                        <Typography color="textSecondary" variant="h5" className="py-8">
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
                        all.map((comment) => (
                                <CommentsListItem comment={comment} key={comment.id}/>
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
        getTickets: Actions.getTickets,
        getTicket: Actions.getTicket,
    }, dispatch);
}

function mapStateToProps({ticketsApp})
{
    console.log(ticketsApp, "Comments Application wahala");
    return {
        tickets   : ticketsApp.tickets.data,
        ticket    : ticketsApp.tickets.ticket,
        searchText: ticketsApp.tickets.searchText,
        admins    : ticketsApp.admins.data,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsList)));
