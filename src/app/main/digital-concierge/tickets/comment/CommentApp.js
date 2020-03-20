import React, {Component} from 'react';
import {FusePageCarded} from '../../../../../@fuse';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from '../../../../../app/store/withReducer';
import CommentList from './comments/CommentList';
import CommentDetails from './comment/CommentDetails';
import CommentsToolbar from './comments/CommentsToolbar';
import CommentToolbar from './comment/CommentToolbar';
import CommentAppHeader from './CommentAppHeader';
import * as Actions from '../../store/actions'
import reducer from '../../store/reducers'

class CommentApp extends Component {

    componentDidMount(){
        this.props.getAdmins()
    }

    render()
    {
        const {match} = this.props;
        const {params} = match;

        return (
            <FusePageCarded
                classes={{
                    root   : "w-full",
                    content: "flex flex-col",
                    header : "items-center min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <CommentAppHeader pageLayout={() => this.pageLayout}/>
                }
                contentToolbar={
                    params.ticketId ? (
                        <CommentToolbar/>
                    ) : (
                        <CommentsToolbar/>
                    )
                }
                content={
                    params.ticketId ? (
                        <CommentDetails/>
                    ) : (
                        <CommentList/>
                    )
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getAdmins: Actions.getAdmins
    }, dispatch);
}

export default withReducer('mailApp', reducer)(connect(null, mapDispatchToProps)(CommentApp));
