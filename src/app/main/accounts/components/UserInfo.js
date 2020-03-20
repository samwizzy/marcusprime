import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import moment from 'moment';

export default function UserInfo({userProfile}) {

    // console.log(userProfile, 'userProfile')

    return (

        <Paper>
            {userProfile && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Info</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{userProfile.firstName} {' '} {userProfile.lastName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>E-mail</TableCell>
                            <TableCell>{userProfile.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>{userProfile.phoneNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Primary Account Number</TableCell>
                            <TableCell>{userProfile.walletId}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>BVN</TableCell>
                            <TableCell>{userProfile.bvn}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell>{userProfile.address}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date Of Birth</TableCell>
                            <TableCell>{userProfile.dob}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Gender</TableCell>
                            <TableCell>{userProfile.gender}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Registration Date</TableCell>
                            <TableCell>{moment(userProfile.createdAt).calendar()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Last Login</TableCell>
                            <TableCell>{moment(userProfile.lastLogin).calendar()}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )}
        </Paper>
    );
}