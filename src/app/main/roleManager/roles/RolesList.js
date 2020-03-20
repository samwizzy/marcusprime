import React, {Component} from 'react';
import {withStyles, List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '../../../../@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as Actions from '../store/actions';
import RolesListItem from './RolesListItem';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.primary[500]
    }
});

class RolesList extends Component {

    componentDidMount()
    {
        console.log(this.props.match.params, "Role Id search in log")
        // this.props.getMails(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getMails(this.props.match.params);
        }
    }

    getFilteredArray = (admins, searchText) => {
        if ( searchText.length === 0 )
        {
            return admins;
        }
        return FuseUtils.filterArrayByString(admins, searchText);
    };

    render()
    {
        const {mails, searchText, admins} = this.props;

        const all = this.getFilteredArray(admins, searchText);
        // console.log(mails, "Menu List Component");
        console.log(admins, "Admins List Component");

        if ( all.length === 0 )
        {
            return (
                <FuseAnimate delay={100}>
                    <div className="flex flex-1 items-center justify-center h-full">
                        <Typography color="textSecondary" variant="h5">
                            There are currently no administrator!
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
                        all.map((mail) => (
                                <RolesListItem mail={mail} key={mail.adUserID}/>
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
    }, dispatch);
}

function mapStateToProps({roleApp})
{
    console.log(roleApp, "Role Application wahala");
    return {
        mails     : roleApp.mails.entities,
        searchText: roleApp.admin.searchText,
        admins    : roleApp.admin.data,
        roles     : roleApp.roles.data,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(RolesList)));
