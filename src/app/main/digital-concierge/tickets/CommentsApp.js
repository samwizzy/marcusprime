import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MUIDataTable from 'mui-datatables'
import {FuseExample, FusePageCarded, FusePageSimple, FuseChipSelect } from '../../../../@fuse';
import withReducer from '../../../../app/store/withReducer';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Button, Divider, Tabs, Tab, Fab, Typography, Icon, IconButton } from '@material-ui/core';
import reducer from '../store/reducers';
import TicketsDialog from './components/TicketsDialog'
import CommentTicketDialog from './components/CommentTicketDialog'
import TicketChip from './components/TicketChip'
import moment from 'moment';
import * as Actions from '../store/actions'
import {columns, options, action} from './components/columns/Column1'
import CommentsList from './components/CommentsList'
import CommentsToolbar from './components/CommentsToolbar';
import CommentToolbar from './components/CommentToolbar';
import _ from 'lodash'

const labels = [
  {
      'id'    : 0,
      'title' : 'New',
      'color' : '#607d8b'
  },
  {
      'id'    : 1,
      'title' : 'In-Progress',
      'color' : '#7cb342'
  },
  {
      'id'    : 2,
      'title' : 'Closed',
      'color' : '#d84315'
  }
];

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper
  },
  header: { background: "red" },
  button: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class CommentsApp extends React.Component {
  state = {
    value: 0,
    composeDialog: false,
    commentDialog: false,
  };

  componentDidMount(){
    this.props.getDepartments()
    this.props.getTickets()
    this.props.getAdmins()

    const { match } = this.props
    const { ticketId } = match.params
    this.props.getTicket(ticketId)
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, openTicketStatusDialog, openTicketEscalateDialog, openNewCommentDialog, tickets, ticket, match } = this.props;
    const { params } = match
    const { ticketId } = params
    const { comments } = ticket
    const { value } = this.state;

    if(!ticket || !comments || !labels){
      return ''
    }

    return (
      <FusePageSimple
        header={
            <div className="flex flex-1 items-center justify-between p-24">
                <div className="flex flex-col">
                    <div className="mt-32 mb-16">
                      <Typography variant="h6">{ticket.requestName}</Typography>
                      <Typography variant="body2">{moment(ticket.createdAt).format('LLL')}</Typography>
                      <Typography variant="body2"><strong>Department: </strong> {ticket.dept.name}</Typography>
                      <Typography variant="subtitle1">
                        <TicketChip className="mt-4" title={_.find(labels, {id: ticket.status}).title} color={_.find(labels, {id: ticket.status}).color} key={ticket.id}/>
                      </Typography>
                    </div>
                </div>
            </div>
        }
        content={
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Comments" />
                <Tab label="Turning Around Time" />
              </Tabs>
            </AppBar>

            {value === 0 && 
            <TabContainer>
              <FusePageCarded
                  style={{border: '1px solid red'}}
                  classes={{
                      root   : "w-full",
                      content: "flex flex-col",
                      header : "items-center sm:h-30" //"items-center min-h-4 h-4 sm:h-30 sm:min-h-50" //h-64
                  }}
                  contentToolbar={
                      params.ticketId ? (
                          <CommentsToolbar/>
                      ) : (
                          <CommentToolbar/>
                      )
                  }
                  content={
                    <CommentsList comments={comments} />
                  }
                  onRef={instance => {
                      this.pageLayout = instance;
                  }}
                  innerScroll
              />
            </TabContainer>}

            {value === 1 && 
            <TabContainer>
              <MUIDataTable
                  title={"Turn Around Time On Tickets"}
                  data={tickets}
                  columns={columns}
                  options={options}
              />
            </TabContainer>}
    
            <CommentTicketDialog />
            <TicketsDialog />
          </div>
        }
      />
    );
  }
}

CommentsApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAdmins              : Actions.getAdmins,
    getTickets              : Actions.getTickets,
    getTicket               : Actions.getTicket,
    getDepartments          : Actions.getDepartments,
    openNewTicketDialog     : Actions.openNewTicketDialog,
    openNewCommentDialog    : Actions.openNewCommentDialog,
    openTicketStatusDialog  : Actions.openTicketStatusDialog,
    openUpdateTicketDialog  : Actions.openUpdateTicketDialog,
    openTicketEscalateDialog: Actions.openTicketEscalateDialog,
  }, dispatch)
}

const mapStateToProps = ({ticketsApp}) => {
  console.log(ticketsApp, "Single Ticket Props")
  const { tickets } = ticketsApp
  return {
      tickets: tickets.data,
      ticket : tickets.ticket,
  }
}

export default withReducer("ticketsApp", reducer)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CommentsApp)));