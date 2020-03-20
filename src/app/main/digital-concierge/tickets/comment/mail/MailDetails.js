import React, {Component} from 'react';
import {Avatar, Divider, Icon, IconButton, Typography} from '@material-ui/core';
import {FuseAnimate} from './node_modules/@fuse';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import _ from './node_modules/@lodash';
import * as Actions from '../../../store/actions/index';
import MailChip from '../MailChip';
import moment from 'moment';

class MailDetails extends Component {

    state = {showDetails: false};

    componentDidMount()
    {
        // console.log(this.props.match.params.ticketId, "Shout liuyd clear")
        this.props.getMail(this.props.match.params);
        this.props.getComment(this.props.match.params.ticketId);
    }

    render()
    {
        const {mail, comment, labels} = this.props;

        if ( !comment || !comment.user )
        {
            return '';
        }

        return (
            <div className="p-16 sm:p-24">
                
                <div className="flex items-center justify-between overflow-hidden">

                    <div className="flex flex-col">
                        <FuseAnimate delay={100}>
                            <Typography variant="subtitle1" className="flex">{comment.comment}</Typography>
                        </FuseAnimate>

                        {labels && mail.labels.length > 0 && (
                            <div className="flex flex-wrap mt-8">
                                {mail.labels.map(label => (
                                    <MailChip className="mt-4 mr-4" title={_.find(labels, {id: label}).title} color={_.find(labels, {id: label}).color} key={label}/>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                <Divider className="my-16"/>

                <FuseAnimate animation="transition.slideUpIn" delay={200}>
                    <div>
                        <div className="flex items-start justify-between">
                            
                            <div className="flex items-center justify-start">
                                
                                {comment.user.photo ?
                                    (
                                        <Avatar className="mr-8" alt={comment.user.displayName} src={comment.user.displayName}/>
                                    )
                                    :
                                    (
                                        <Avatar className="mr-8">
                                            {comment.user.displayName}
                                        </Avatar>
                                    )
                                }

                                <div className="flex flex-col">
                                    <span>{comment.user.firstName}</span>
                                    <Typography component="div" color="textSecondary" variant="body1" className="flex items-center justify-start">
                                        <div>to</div>
                                        <div className="ml-4">{comment.user.lastName}</div>
                                    </Typography>
                                </div>
                            </div>
                            
                            <IconButton>
                                <Icon>more_vert</Icon>
                            </IconButton>
                        </div>

                        <div className="my-16">
                            <Typography
                                color="secondary"
                                className="cursor-pointer underline mb-8 text-grey-lightest"
                                onClick={() => {
                                    this.setState({showDetails: !this.state.showDetails});
                                }}
                            >
                                {this.state.showDetails ?
                                    (
                                        <span>Hide Details</span>
                                    )
                                    :
                                    (
                                        <span>Show Details</span>
                                    )
                                }
                            </Typography>

                            {this.state.showDetails && (
                                <div className="flex">
                                    <Typography variant="body2" className="flex flex-col">
                                        <span>To:</span>
                                        <span>Department:</span>
                                        <span>Date:</span>
                                    </Typography>

                                    <Typography variant="body2" color="textSecondary" className="pl-4 flex flex-col">
                                        <span>{comment.user.email}</span>
                                        <span>{comment.user.department}</span>
                                        <span>{moment(comment.createdAt).format('LLL')}</span>
                                    </Typography>
                                </div>
                            )}
                        </div>

                        <Typography variant="body2" dangerouslySetInnerHTML={{__html: comment.comment}}/>

                        <Divider className="my-16"/>
                    </div>
                </FuseAnimate>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getMail   : Actions.getMail,
        getComment: Actions.getComment,
    }, dispatch);
}

function mapStateToProps({mailApp})
{
    console.log(mailApp, "Mail APpp")
    const { tickets } = mailApp
    return {
        mail  : mailApp.mail,
        labels: mailApp.labels,
        comment: tickets.comment
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MailDetails));
