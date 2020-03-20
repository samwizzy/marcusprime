import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import moment from 'moment';

export default function UserInfo({ userProfile }) {

    return (

        <div>
            {userProfile && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            {/* <TableCell>MAC Address</TableCell> */}
                            <TableCell>Device IP</TableCell>
                            <TableCell>SERIAL NO</TableCell>
                            <TableCell>S/W Version</TableCell>
                            <TableCell>Device Type</TableCell>
                            <TableCell>Device OS</TableCell>
                            <TableCell>Longitude</TableCell>
                            <TableCell>Latitude</TableCell>
                            <TableCell>Date Added</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userProfile.userDevice &&
                            <TableRow>
                                <TableCell>{userProfile.username}</TableCell>
                                {/* <TableCell>{userProfile.userDevice.deviceCode}</TableCell> */}
                                <TableCell>{userProfile.userDevice.deviceIp}</TableCell>
                                <TableCell>{userProfile.userDevice.deviceCode}</TableCell>
                                <TableCell>{userProfile.userDevice.softwareVersion}</TableCell>
                                <TableCell>{userProfile.userDevice.deviceType}</TableCell>
                                <TableCell>{userProfile.userDevice.osType}</TableCell>
                                <TableCell>{userProfile.userDevice.location.longitude}</TableCell>
                                <TableCell>{userProfile.userDevice.location.latitude}</TableCell>
                                <TableCell>{moment(userProfile.userDevice.createdAt).format("MMM Do YY")}</TableCell>
                                <TableCell>
                                    {(userProfile.enable === true) ? 'Active' : 'Inactive'}
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            )}
        </div>
    );
}