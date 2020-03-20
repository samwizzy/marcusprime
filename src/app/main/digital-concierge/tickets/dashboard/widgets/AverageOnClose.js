import React, {Component} from 'react';
import {Icon, Typography, Paper, IconButton} from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment'

class AverageOnClose extends Component {

    calcClosedTime = (tickets) => {
        const total = _.size(tickets)
        const filtered_tickets = tickets.filter(function (ticket) {
            return ticket.responseTime !==  null;
        });

        const totalDate = filtered_tickets.reduce(function (accumulator, ticket) {
            let timestamp = moment(ticket.updatedAt).unix();
            return accumulator + timestamp
        }, 0);
        const averageTime = isNaN(totalDate)? -1 : Math.ceil(totalDate / total)
        return moment.unix(averageTime).format("HH:mm")
    } 

    render()
    {
        const {widget} = this.props;
        const {tickets} = widget

        const averageTime = this.calcClosedTime(tickets)

        return (
            <Paper className="w-full rounded-8 shadow-none border-1">
                <div className="flex items-center justify-between pr-4 pl-16 pt-4">
                    <Typography className="text-16">Average Time On Closed</Typography>
                    <IconButton aria-label="more">
                        <Icon>more_vert</Icon>
                    </IconButton>
                </div>
                <div className="text-center pt-12 pb-28">
                    <Typography
                        className="text-72 leading-none text-green">{averageTime.toString() == "Invalid date"? "00:00":averageTime}</Typography>
                    <Typography className="text-16" color="textSecondary">TICKETS TIME</Typography>
                </div>
                <div className="flex items-center px-16 h-52 border-t-1">
                    <Typography className="text-15 flex w-full" color="textSecondary">
                        <span className="truncate">Average Time</span>
                        :
                        <b className="pl-8">{averageTime.toString() == "Invalid date"? "00:00":averageTime}</b>
                    </Typography>
                </div>
            </Paper>
        );
    }
}

export default AverageOnClose;
