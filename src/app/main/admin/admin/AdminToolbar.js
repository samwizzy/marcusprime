import React from 'react';
import {Icon, IconButton} from '@material-ui/core';
import {FuseAnimate} from '../../../../@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as Actions from '../store/actions/index';

const pathToRegexp = require('path-to-regexp');

const AdminToolbar = ({classes, admins, match, history}) => {

    const {params} = match;
    const toPath = pathToRegexp.compile(match.path);
    const matchParams = {...params};
    delete matchParams['id'];
    const deselectUrl = toPath(matchParams);

    if ( !admins )
    {
        return null;
    }

    return (
        <div className="flex flex-1 items-center justify-between overflow-hidden sm:px-16">

            <IconButton onClick={() => history.push(deselectUrl)}>
                <Icon>arrow_back</Icon>
            </IconButton>

        </div>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({adminApp})
{
    return {
        admins: adminApp.admins.data,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminToolbar));
