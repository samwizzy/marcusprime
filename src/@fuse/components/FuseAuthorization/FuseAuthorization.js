import React, {Component} from 'react';
import {matchRoutes} from 'react-router-config';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AppContext from '../../../app/AppContext';
import _ from 'lodash'

class FuseAuthorization extends Component {

    constructor(props, context)
    {
        super(props);
        const {routes} = context;
        this.state = {
            accessGranted: true,
            routes
        };
        // console.log(routes, "Routes Routes")
    }

    componentDidMount()
    {
        if ( !this.state.accessGranted )
        {
            this.redirectRoute(this.props);
        }
    }

    componentDidUpdate()
    {
        if ( !this.state.accessGranted )
        {
            this.redirectRoute(this.props);
        }
    }

    static getDerivedStateFromProps(props, state)
    {
        const {location, user, rights, authRoles, navigation} = props;
        const {role} = user.data
        const {pathname} = location;

        console.log(authRoles, "authRoles")

        const matched = matchRoutes(state.routes, pathname)[0];

        // Url restrictions by role rights
        const { children } = navigation[0] 
        let selected = []
        let matchUrl = false;
        let dashboard = "apps/dashboards/analytics"
        if(role && role.id !== 1){
            selected = children && children.filter(child => {
                return rights && rights.some(r => {
                    return r.module.moduleName.toLowerCase() === child.key.toLowerCase() && r.canview === true
                })
            })

            let subChildren = []
            selected.forEach((child, i) => {
                if(child.children && child.children.length > 0){
                    child.children.map(obj => {
                        subChildren.push(obj)
                        if(obj.url != null){
                            if(pathname.includes(obj.url)){
                                matchUrl = true
                            } 
                        }
                    })
                }
                if(child.url != null){
                    if(pathname.includes(child.url)){
                        matchUrl = true
                    }else if(pathname.includes(dashboard)){
                        matchUrl = true
                    } 
                }
            })

            selected = [...selected, ...subChildren]
        }else{
            let subChildren = []
            children.forEach((child, i) => {
                if(child.children && child.children.length > 0){
                    child.children.map(obj => {
                        subChildren.push(obj)
                        if(obj.url != null){
                            if(pathname.includes(obj.url) || obj.url.includes(pathname)){
                                matchUrl = true
                            } 
                        }
                    })
                }
                if(child.url != null){
                    if(pathname.includes(child.url) || child.url.includes(pathname)){
                        matchUrl = true
                    } 
                }
            })

            selected = [...children, ...subChildren]
        }

        const accessGranted = (pathname && selected.length > 0 && !authRoles.includes(role.name)) ? matchUrl : true;
        // || _.some(selected, {url: pathname})
        return {
            accessGranted
        };
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        return nextState.accessGranted !== this.state.accessGranted;
    }

    redirectRoute(props)
    {
        const {location, user, history} = props;
        const {pathname, state} = location;
        /*
        User is guest
        Redirect to Login Page
        */
        if ( user.data.role.name === 'guest' )
        {
            history.push({
                pathname: '/login',
                state   : {redirectUrl: pathname}
            });
        }
        /*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or redirectUrl
        */
        else
        {
            const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/apps/dashboards/analytics';
            history.push({
                pathname: redirectUrl,
            });
        }
    }

    render()
    {
        const {children} = this.props;
        const {accessGranted} = this.state;
        // console.info('Fuse Authorization rendered', accessGranted);
        return accessGranted ? <React.Fragment>{children}</React.Fragment> : null;
    }
}

function mapStateToProps({fuse, auth})
{
    // console.log(auth.user.data, "auth man")
    return {
        user: auth.user,
        rights: auth.rights.right.rights,
        authRoles: auth.rights.authRoles,
        navigation: fuse.navigation
    }
}

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));
