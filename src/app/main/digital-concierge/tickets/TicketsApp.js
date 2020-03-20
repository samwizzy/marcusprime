import React, { Component } from 'react';
import { withStyles, Typography, Button, Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../../app/store/withReducer';
import _ from 'lodash';
import TicketsList from './components/TicketsList';
import TicketsDialog from './components/TicketsDialog';
import * as Actions from './../store/actions';
import reducer from './../store/reducers';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    },
    button: {
      backgroundColor: theme.palette.background.paper,
      margin: theme.spacing.unit,
    },
    button1: {
      backgroundColor: '#fff',
      marginRight: theme.spacing.unit,
    }
});

class TicketsApp extends Component {

    componentDidMount() {
        const { match } = this.props
        const { params } = match
        if(params.ticketId){
            this.props.findTicketsByStatus(params.ticketId)
        }else{
            this.props.getTickets()
        }
        this.props.getDepartments()
    }

    render() {
        const { classes, getTickets, findTicketsByStatus } = this.props

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar: "w-256 border-0",
                        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    content={
                        <TicketsList />
                    }
                />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTickets         : Actions.getTickets,
        getTicket          : Actions.getTicket,
        findTicketsByStatus: Actions.findTicketsByStatus,
        getDepartments     : Actions.getDepartments,
    }, dispatch);
}

function mapStateToProps({ ticketsApp }) {
    console.log(ticketsApp, "Tickets App")
    const { department, tickets } = ticketsApp
    return { 
        tickets: tickets.data,
     }
}

export default withReducer('ticketsApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TicketsApp))));
