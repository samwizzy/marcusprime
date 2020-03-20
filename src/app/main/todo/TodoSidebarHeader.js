import React, {Component} from 'react';
import {Icon, MenuItem, TextField} from '@material-ui/core';
import {FuseAnimate} from '../../../@fuse';

class TodoSidebarHeader extends Component {

    state = {
        selectedAccount: 'marcus'
    };

    onAccountChange = (ev) => {
        this.setState({selectedAccount: ev.target.value});
    };

    accounts = {
        'marcus'    : 'johndoe@marcus.com',
        'withinpixels': 'johndoe@withinpixels.com'
    };

    render()
    {
        return (
            <div className="flex flex-col justify-center h-full p-24">

                <div className="flex items-center flex-1">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-16">receipt</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <span className="text-24">Ticket Management</span>
                    </FuseAnimate>
                </div>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <TextField
                        id="account-selection"
                        select
                        label={this.state.selectedAccount}
                        value={this.state.selectedAccount}
                        onChange={this.onAccountChange}
                        placeholder="Select Account"
                        margin="normal"
                    >
                        {Object.keys(this.accounts).map((key, value) => (
                            <MenuItem key={key} value={key}>
                                {this.accounts[key]}
                            </MenuItem>
                        ))}
                    </TextField>
                </FuseAnimate>
            </div>
        );
    }
}

export default TodoSidebarHeader;
