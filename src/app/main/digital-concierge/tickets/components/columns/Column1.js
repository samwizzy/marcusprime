import React from 'react'
import {AppBar, Button, Divider, Tabs, Tab, Fab, Typography, Icon, IconButton} from '@material-ui/core';
import moment from 'moment'
import {AddTicket, AddComment} from './../AddButton'


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
      name: "requestName",
      label: "Request Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "dept.name",
      label: "Department",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "ResponseTime",
      label: "Response Time",
      options: {
        display: 'excluded',
        filter: true,
        sort: true,
      }
    },
    {
      name: "createdAt",
      label: "Time Ago",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (createdAt, tableMeta) => {
            // const ticket = tickets && tickets.find(ticket => ticket.id === id)
            const { rowData } = tableMeta
            console.log(rowData, "rowData")
            const then = moment(createdAt).format("DD/MM/YYYY HH:mm:ss")
            const now = moment(rowData[3]).format("DD/MM/YYYY HH:mm:ss")
            return (
                <Typography variant="inherit">
                    {moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")}
                </Typography>
            );
        }
      }
    }
  ];


  const options = {
    filter: true,
    filterType: 'checkbox',
    responsive: "stacked",
    selectableRows: 'none',
    // customToolbar: () => {
    //   return (
    //     <AddComment
    //       openCommentDialog={props.openNewCommentDialog}
    //     />
    //   );
    // },
    filter: false,
    viewColumns: false,
    print: false, 
    download: false
  }

  const action = (props) => {
    console.log(props, "props props props")
    return (
      <div />
    )
  }


  // const mapStateToProps = ({ticketsApp}) => {
  //   const { tickets } = ticketsApp
  //   return {
  //       tickets: tickets.data,
  //       ticket : tickets.ticket,
  //   }
  // }

  export {columns, options, action}