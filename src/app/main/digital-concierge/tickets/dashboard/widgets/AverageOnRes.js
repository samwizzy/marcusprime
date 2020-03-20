import React, {Component} from 'react';
import {Icon, Typography, Paper, IconButton} from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment';

class AverageOnRes extends Component {

    state = {
        total: 0
    }

    componentDidMount(){
        // var now  = "04/09/2013 15:00:00";
        // var then = "04/09/2013 14:20:30";
        var now  = moment("2019-07-31T16:05:04.808+0000").format("DD/MM/YYYY HH:mm:ss");
        var then = moment("2019-07-24T08:26:10.961+0000").format("DD/MM/YYYY HH:mm:ss");


        const times = moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
        console.log(times, "All times over")
        // outputs: "00:39:30"
    }

    calcResponse = (tickets) => {
        const total = _.size(tickets)
        const filtered_tickets = tickets.filter(function (ticket) {
            return ticket.updatedAt !==  null;
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
        
        const averageTime = this.calcResponse(tickets)

        return (
            <Paper className="w-full rounded-8 shadow-none border-1">
                <div className="flex items-center justify-between pr-4 pl-16 pt-4">
                    <Typography className="text-16">Average Time On Response</Typography>
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

export default AverageOnRes;
