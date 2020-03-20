import React, {Component} from 'react';
import {Icon, Link, Typography, Paper, IconButton} from '@material-ui/core';
import {withRouter} from 'react-router-dom'

class Widget3 extends Component {
    render()
    {
        const {widget} = this.props;

        return (
            <Paper className="w-full rounded-8 shadow-none border-1">
                <div className="flex items-center justify-between pr-4 pl-16 pt-4">
                    <Typography component="div" className="text-16">
                        <Link
                            className="w-full cursor-pointer"
                            component="div"
                            variant="body1"
                            onClick={() => {
                                this.props.history.push('/apps/tickets/1')
                            }}
                        >
                            Ïn-Progress
                        </Link>
                    </Typography>
                    <IconButton aria-label="more">
                        <Icon>more_vert</Icon>
                    </IconButton>
                </div>
                <div className="text-center pt-12 pb-28">
                    <Typography
                        className="text-72 leading-none text-orange">{widget.count}</Typography>
                    <Typography className="text-16" color="textSecondary">{widget.count > 1? "TICKETS":"TICKET"}</Typography>
                </div>
                <div className="flex items-center px-16 h-52 border-t-1">
                    <Typography className="text-15 flex w-full" color="textSecondary">
                        <span className="truncate">Tickets In-Progress</span>
                        :
                        <b className="pl-8">{widget.count}</b>
                    </Typography>
                </div>
            </Paper>
        );
    }
}

export default withRouter(Widget3);
