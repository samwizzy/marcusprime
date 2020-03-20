import React, {Component} from 'react';
import {FusePageCarded} from '../../../@fuse';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from '../../../app/store/withReducer';
import RolesList from './roles/RolesList';
import RolesDetails from './role/RoleDetails';
import RolesToolbar from './roles/RolesToolbar';
import RoleToolbar from './role/RoleToolbar';
import RolesAppHeader from './RolesAppHeader';
import RolesAppSidebarHeader from './RolesAppSidebarHeader';
import RolesAppSidebarContent from './RolesAppSidebarContent';
import * as Actions from './store/actions';
import reducer from './store/reducers';

class RoleApp extends Component {

    componentDidMount()
    {
        this.props.getLabels();
        this.props.getAdmins();
        this.props.getRoles();

        console.log(this.props.match.params, "Match Param");
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
                    <RolesAppHeader pageLayout={() => this.pageLayout}/>
                }
                contentToolbar={
                    params.id ? (
                        <RoleToolbar/>
                    ) : (
                        <RolesToolbar/>
                    )
                }
                content={
                    params.id ? (
                        <RolesDetails/>
                    ) : (
                        <RolesList/>
                    )
                }
                leftSidebarHeader={
                    <RolesAppSidebarHeader/>
                }
                leftSidebarContent={
                    <RolesAppSidebarContent/>
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
        getLabels: Actions.getLabels,
        getRoles : Actions.getRoles,
        getAdmins: Actions.getAdmins
    }, dispatch);
}

export default withReducer('roleApp', reducer)(connect(null, mapDispatchToProps)(RoleApp));
