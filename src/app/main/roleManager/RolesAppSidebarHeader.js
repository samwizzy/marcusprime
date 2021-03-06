import React, {Component} from 'react';
import {Icon, MenuItem, TextField} from '@material-ui/core';
import {FuseAnimate} from '../../../@fuse';

class RolesAppSidebarHeader extends Component {

    state = {
        selectedAccount: 'super admin'
    };

    onAccountChange = (ev) => {
        this.setState({selectedAccount: ev.target.value});
    };

    accounts = {
        'super admin' : 'saokeke@unionbankng.com',
        'alt admin'   : 'test@unionbankng.com'
    };

    render()
    {
        return (
            <div className="flex flex-col justify-center h-full p-24">

                <div className="flex items-center flex-1">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="mr-16 text-32">group</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <span className="text-18">Role Manager</span>
                    </FuseAnimate>
                </div>

                {/* <FuseAnimate animation="transition.slideUpIn" delay={300}>
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
                </FuseAnimate> */}
            </div>
        );
    }
}

export default RolesAppSidebarHeader;
