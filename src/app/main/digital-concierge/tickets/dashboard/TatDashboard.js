import React, {Component} from 'react';
import {Menu, MenuItem, Link, ListItem, Hidden, Icon, IconButton, Tab, Tabs, Typography, withStyles} from '@material-ui/core';
import {FuseAnimateGroup, FusePageSimple} from '../../../../../@fuse';
import {connect} from 'react-redux';
import {withRouter, Link as RouterLink, Redirect} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import withReducer from '../../../../../app/store/withReducer';
import * as Actions from './../../store/actions'
import reducer from './../../store/reducers';
import _ from 'lodash';
import classNames from 'classnames';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';
import Widget6 from './widgets/Widget6';
import Widget7 from './widgets/Widget7';
import Widget8 from './widgets/Widget8';
import Widget9 from './widgets/Widget9';
import Widget10 from './widgets/Widget10';
import AverageOnRes from './widgets/AverageOnRes';
import AverageOnClose from './widgets/AverageOnClose';
import Widget11 from './widgets/Widget11';
import WidgetNow from './widgets/WidgetNow';
import WidgetWeather from './widgets/WidgetWeather';


function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const styles = theme => ({
        content          : {
            '& canvas': {
                maxHeight: '100%'
            }
        },
        selectedProject  : {
            background  : theme.palette.primary.main,
            color       : theme.palette.primary.contrastText,
            borderRadius: '8px 0 0 0'
        },
        projectMenuButton: {
            background  : theme.palette.primary.main,
            color       : theme.palette.primary.contrastText,
            borderRadius: '0 8px 0 0',
            marginLeft  : 1
        },
        linkStyle: {
            minWidth: '100%'
        }
    }
);

class ProjectDashboardApp extends Component {
    state = {
        tabValue         : 0,
        selectedProjectId: 1,
        projectMenuEl    : null
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChangeProject = selectedProjectId => {
        this.setState({
            selectedProjectId,
            projectMenuEl: null
        });
    };

    handleOpenProjectMenu = event => {
        this.setState({projectMenuEl: event.currentTarget});
    };

    handleCloseProjectMenu = () => {
        this.setState({projectMenuEl: null});
    };

    componentDidMount()
    {
        this.props.getWidgets();
        this.props.getProjects();
        this.props.getTickets();
        this.props.ticketsByNewStatus(0);
        this.props.ticketsByProgressStatus(1);
        this.props.ticketsByClosedStatus(2);
    }

    render()
    {
        const {widgets, projects, tickets, opened, progress, closed, classes, user} = this.props;
        const {tabValue, selectedProjectId, projectMenuEl} = this.state;

        if ( !widgets ||
             !widgets.widget1 ||
             !widgets.widget2 || 
             !widgets.widget3 || 
             !widgets.widget4 || 
             !widgets.widget5 || 
             !widgets.widget6 || 
             !widgets.widget7 || 
             !widgets.widget8 || 
             !widgets.widget9 || 
             !widgets.widget10 || 
             !projects )
        {
            return null;
        }

        console.log(widgets, "The list of widgets")
        console.log(this.props, "The list of Props object")

        return (
            <FusePageSimple
                classes={{
                    header      : "min-h-160 h-160",
                    toolbar     : "min-h-48 h-48",
                    rightSidebar: "w-288",
                    content     : classes.content,
                }}
                // header={
                //     <div className="flex flex-col justify-between flex-1 px-24 pt-24">
                //         <div className="flex justify-between items-start">
                //             <Typography className="py-0 sm:py-24" variant="h4">Welcome back, {user.firstName}!</Typography>
                //             <Hidden lgUp>
                //                 <IconButton
                //                     onClick={(ev) => this.pageLayout.toggleRightSidebar()}
                //                     aria-label="open left sidebar"
                //                 >
                //                     <Icon>menu</Icon>
                //                 </IconButton>
                //             </Hidden>
                //         </div>
                        
                //     </div>
                // }
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="off"
                        className="w-full border-b-1 px-24"
                    >
                        {/* <Tab className="text-14 font-600 normal-case" label="Home"/> */}
                        <Tab className="text-14 font-600 normal-case" label="Tickets Summary"/>
                        {/* <Tab className="text-14 font-600 normal-case" label="Department Members"/> */}
                    </Tabs>
                }
                content={
                    <div className="p-12">
                        {tabValue === 0 &&
                        (
                            <FuseAnimateGroup
                                className="flex flex-wrap"
                                enter={{
                                    animation: "transition.slideUpBigIn"
                                }}
                            >
                                <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                    <Widget1 widget={{count: _.size(tickets)}}/>
                                </div>
                                <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                    <Widget2 widget={{count: _.size(opened)}}/>
                                </div>
                                <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                    <Widget3 widget={{count: _.size(progress)}}/>
                                </div>
                                <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                    <Widget4 widget={{count: _.size(closed)}}/>
                                </div>

                                <div className="widget flex w-full sm:w-1/2 p-12">
                                    <AverageOnRes widget={{tickets}}/>
                                </div>
                                <div className="widget flex w-full sm:w-1/2 p-12">
                                    <AverageOnClose widget={{tickets}}/>
                                </div>
                            </FuseAnimateGroup>
                        )}
                        {tabValue === 1 && (
                            <FuseAnimateGroup
                                className="flex flex-wrap"
                                enter={{
                                    animation: "transition.slideUpBigIn"
                                }}
                            >
                                <div className="widget flex w-full sm:w-1/2 p-12">
                                    <Widget8 widget={widgets.widget8}/>
                                </div>
                                <div className="widget flex w-full sm:w-1/2 p-12">
                                    <Widget9 widget={widgets.widget9}/>
                                </div>
                                <div className="widget flex w-full p-12">
                                    <Widget10 widget={widgets.widget10}/>
                                </div>
                            </FuseAnimateGroup>
                        )}
                        {tabValue === 2 && (
                            <FuseAnimateGroup
                                className="flex flex-wrap"
                                enter={{
                                    animation: "transition.slideUpBigIn"
                                }}
                            >
                                <div className="widget flex w-full p-12">
                                    <Widget11 widget={widgets.widget11}/>
                                </div>
                            </FuseAnimateGroup>
                        )}
                    </div>
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
            />
        );
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getWidgets             : Actions.getWidgets,
        getProjects            : Actions.getProjects,
        getTickets             : Actions.getTickets,
        ticketsByNewStatus     : Actions.ticketsByNewStatus,
        ticketsByProgressStatus: Actions.ticketsByProgressStatus,
        ticketsByClosedStatus  : Actions.ticketsByClosedStatus,
    }, dispatch);
}

function mapStateToProps({projectDashboardApp, auth})
{
    const { user } = auth 
    return {
        widgets : projectDashboardApp.tickets.widgets,
        projects: projectDashboardApp.tickets.projects,
        tickets : projectDashboardApp.tickets.data,
        opened     : projectDashboardApp.tickets.new,
        progress: projectDashboardApp.tickets.progress,
        closed  : projectDashboardApp.tickets.closed,
        user    : user.data
    }
}

export default withReducer('projectDashboardApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDashboardApp))));
