import React from 'react';
import {withStyles, Hidden, Icon, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {FuseAnimate} from '../../../../@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classNames from 'classnames';
import * as Actions from './../store/actions';
import moment from 'moment';
import _ from 'lodash'
import formatter from './../components/Formatter'

const styles = theme => ({
    typeIcon: {
        '&.folder:before'     : {
            content: "'folder'",
            color  : '#FFB300'
        },
        '&.document:before'   : {
            content: "'insert_drive_file'",
            color  : '#1565C0'
        },
        '&.spreadsheet:before': {
            content: "'insert_chart'",
            color  : '#4CAF50'
        }
    }
});

const PtaList = ({classes, files, ptas, user, rights, selectedItem, setSelectedItem, pageLayout}) => {

    if(!ptas){
        return ''
    }
    const selectedPtas = _.orderBy(ptas, ['createdAt'], ['desc']);
    const r = _.find(rights, function(o) { return o.module.moduleName === 'PTA Manager'; });

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell className="hidden sm:table-cell">Type</TableCell>
                        <TableCell className="hidden sm:table-cell">Owner</TableCell>
                        <TableCell className="text-center hidden sm:table-cell">Status</TableCell>
                        <TableCell className="hidden sm:table-cell">Pick-Up Date</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {selectedPtas && selectedPtas.map((pta, i) => {
                        return (
                            <TableRow
                                key={pta.id}
                                hover
                                onClick={event => setSelectedItem(pta.id)}
                                selected={pta.id === selectedItem}
                                className="cursor-pointer"
                            >
                                <TableCell className="max-w-64 w-64 p-0 text-center">
                                    <Icon className={classNames(classes.typeIcon, 'document')}></Icon>
                                </TableCell>
                                <TableCell>
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: pta.currencyCode }).format(pta.amountAppliedFor)}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{pta.fxCategory.name}</TableCell>
                                <TableCell className="hidden sm:table-cell">{pta.applicantName}</TableCell>
                                <TableCell className="text-center hidden sm:table-cell">{pta.status === 0? "Unattended" : pta.status === 1? "Approved": "Declined" }</TableCell>
                                <TableCell className="hidden sm:table-cell">{moment(pta.pickupDate).format('LLL')}</TableCell>
                                <Hidden lgUp>
                                    <TableCell>
                                        <IconButton
                                            onClick={(ev) => pageLayout().toggleRightSidebar()}
                                            aria-label="open right sidebar"
                                        >
                                            <Icon>info</Icon>
                                        </IconButton>
                                    </TableCell>
                                </Hidden>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </FuseAnimate>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getFiles       : Actions.getFiles,
        setSelectedItem: Actions.setSelectedItem
    }, dispatch);
}

function mapStateToProps({fileManagerApp, auth})
{
    return {
        ptas        : fileManagerApp.pta.data,
        files       : fileManagerApp.files,
        selectedItem: fileManagerApp.selectedItem,
        user        : auth.user.data,
        rights      : auth.rights.right.rights,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(PtaList)));