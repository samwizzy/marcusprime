import React from 'react';
import {Icon, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

const MainSidebarContent = () => {
    return (
        <List component="nav">
            <ListItem button dense>
                <ListItemIcon>
                    <Icon className="text-20 mr-0">folder</Icon>
                </ListItemIcon>
                <ListItemText primary="My PTA"/>
            </ListItem>
            <ListItem button dense>
                <ListItemIcon>
                    <Icon className="text-20 mr-0">star</Icon>
                </ListItemIcon>
                <ListItemText primary="Approved"/>
            </ListItem>
            <ListItem button dense>
                <ListItemIcon>
                    <Icon className="text-20 mr-0">folder_shared</Icon>
                </ListItemIcon>
                <ListItemText primary="Unattended"/>
            </ListItem>
            <ListItem button dense>
                <ListItemIcon>
                    <Icon className="text-20 mr-0">not_interested</Icon>
                </ListItemIcon>
                <ListItemText primary="Declined"/>
            </ListItem>
        </List>
    );
};

export default MainSidebarContent;

