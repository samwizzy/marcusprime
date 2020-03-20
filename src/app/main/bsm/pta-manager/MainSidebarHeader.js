import React from 'react';
import {Icon, Typography} from '@material-ui/core';

const MainSidebarHeader = () => {
    return (
        <div className="flex items-center h-full p-12">
            <Icon>folder</Icon>
            <Typography variant="h6" className="ml-12">PTA Manager</Typography>
        </div>
    );
};

export default MainSidebarHeader;
