import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MUIDataTable from 'mui-datatables'
import {FuseExample, FusePageSimple, FuseChipSelect } from '../../../../@fuse';
import withReducer from '../../../../app/store/withReducer';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Button, Divider, Tabs, Tab, Fab, Typography, Icon, IconButton } from '@material-ui/core';
import reducer from '../store/reducers';
import TicketsDialog from './components/TicketsDialog'
import CommentTicketDialog from './components/CommentTicketDialog'
import {AddTicket, AddComment} from './components/AddButton'
import TicketChip from './components/TicketChip'
import moment from 'moment';
import * as Actions from '../store/actions'
import column from './components/columns/Column1'
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
    backgroundColor: theme.palette.background.paper
  },
  button: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class TicketDetails extends React.Component {
  state = {
    value: 0,
    composeDialog: false,
    commentDialog: false,
  };

  componentDidMount(){
    this.props.getDepartments()
    this.props.getTickets()

    const { match } = this.props
    const { ticketId } = match.params
    this.props.getTicket(ticketId)
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, openTicketStatusDialog, openTicketEscalateDialog, openNewCommentDialog, tickets, ticket, match } = this.props;
    const { ticketId } = match.params
    const { comments } = ticket
    const { value } = this.state;

    if(!ticket || !comments){
      return ''
    }

    const columns = [
      {
        name: "id",
        label: "Id",
        options: {
          display: 'excluded',
          filter: true,
          sort: true,
        }
      },
      {
        name: "comment",
        label: "Comment",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "user.displayName",
        label: "Comment By",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "user.department",
        label: "Department",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "createdAt",
        label: "Date Created",
        options: {
          filter: true,
          sort: false,
          customBodyRender: createdAt => {
            return (
                <Typography variant="inherit">{moment(createdAt).format('LLL')}</Typography>
            );
          }
        }
      },
      {
        name: "createdAt",
        label: "Duration",
        options: {
          filter: true,
          sort: false,
          customBodyRender: createdAt => {
            const ago = moment().diff(createdAt, 'days')
            const days = ago > 1 ? 'days' : 'day'
            return (
                <Typography variant="inherit">{ago} {days}</Typography>
            );
          }
        }
      },
      {
        name: "id",
        label: "Edit",
        options: {
          display: 'excluded',
          customBodyRender: id => {
            return (
                <IconButton
                  onClick={(ev, dispatch) => {
                      ev.stopPropagation();
                      this.props.openUpdateTicketDialog()
                      this.openComposeDialog();
                  }}
                >
                  <Icon>edit</Icon>
                </IconButton>
            );
          },
        }
      }
    ];

    const options = {
      filter: true,
      filterType: 'checkbox',
      responsive: "stacked",
      selectableRows: 'none',
      customToolbar: () => {
        return (
          <AddComment
            openCommentDialog={openNewCommentDialog}
          />
        );
      }
    };

    return (
      <FusePageSimple
        header={
            <div className="flex flex-1 items-center justify-between p-24">
                <div className="flex flex-col">
                    <div className="flex items-center mb-16">
                        <Icon className="text-18" color="action">home</Icon>
                        <Icon className="text-16" color="action">chevron_right</Icon>
                        <Typography color="textSecondary">Components</Typography>
                        <Icon className="text-16" color="action">chevron_right</Icon>
                        <Typography color="textSecondary">Comments</Typography>
                    </div>
                    <div className="mb-16">
                      <Typography variant="h6">{ticket.requestName}</Typography>
                      <Typography variant="body2">{moment(ticket.createdAt).format('LLL')}</Typography>
                      <Typography variant="body2"><strong>Department: </strong> {ticket.dept.name}</Typography>
                      <Typography variant="subtitle1">
                        <TicketChip className="mt-4" title={_.find(labels, {id: ticket.status}).title} color={_.find(labels, {id: ticket.status}).color} key={ticket.status}/>
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
              <MUIDataTable
                  title={"All Comments"}
                  data={comments}
                  columns={columns}
                  options={options}
              />
              <Divider />
              <div>
                <Button variant="outlined" color="secondary" className={classes.button} onClick={() => {
                  openTicketStatusDialog(ticketId);
                }}>
                  Change Status
                </Button>
                <Button variant="outlined" color="secondary" className={classes.button} onClick={() => {
                  openTicketEscalateDialog(ticketId);
                }}>
                  Escalate
                </Button>
                <Button variant="outlined" color="secondary" className={classes.button} onClick={() => {
                  openNewCommentDialog();
                }}>
                  Comment
                </Button>
              </div>
            </TabContainer>}
            {value === 1 && 
              <TabContainer>
                <MUIDataTable
                  title={"Turn Around Time On Tickets"}
                  data={tickets}
                  columns={column}
                  options={options}
                />
              </TabContainer>}
            {value === 2 && <TabContainer>Item Three</TabContainer>}
    
            <CommentTicketDialog />
            <TicketsDialog />
          </div>
        }
      />
    );
  }
}

TicketDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getTickets               : Actions.getTickets,
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

export default withReducer("ticketsApp", reducer)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TicketDetails)));