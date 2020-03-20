import React from 'react';
import {withStyles, FormControlLabel, Icon, Switch, Typography, IconButton, Button} from '@material-ui/core';
import {FuseAnimate} from '../../../../@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PtaDialog from './PtaDialog'
import {connect} from 'react-redux';
import * as Actions from './../store/actions'
import classNames from 'classnames';
import moment from 'moment'
import _ from 'lodash'
import formatter from './../components/Formatter'

const styles = theme => ({
    table   : {
        '& th': {
            padding: '16px 0'
        }
    },
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

const downloadImage = (doc) => {
    const linkSource = `data:application/octet-stream;base64,${doc.documentContent}`;
    const downloadLink = document.createElement("a");
    const fileName = `${doc.documentName}${doc.extension}`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

const DetailSidebarContent = ({classes, ptas, doc, rights, files, selectedItem, openComposeDialog, approvePta, declinePta, getPtaDocById}) => {

    const [pta, setPta] = React.useState({})
    const r = _.find(rights, function(o) { return o.module.moduleName === 'PTA Manager'; });

    console.log(rights, "rightsrights")
    console.log(r, "single rights rights")

    const selected = _.find(ptas, {id: selectedItem});  
    
    React.useEffect(() => {
        setPta(selected)
    })

    React.useEffect(() => {
        if(!_.isEmpty(doc)){
            downloadImage(doc)
        }
    }, [doc])

    if ( !pta || !pta.branch || !pta.fxCategory )
    {
        return null;
    }

    const handleApprove = (id, status) => {
        const data = { fxId: id, status}
        approvePta(data)
    }
    const handleDecline = (id, status) => {
        const data = { fxId: id, status}
        declinePta(data)
    }

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={200}>

            <div className="file-details p-16 sm:p-24">
                
                {pta.documents && pta.documents.length > 0 &&
                <div className="preview h-128 sm:h-256 file-icon flex items-center justify-center">
                    <table className={classNames(classes.table, "w-full, text-left")}>
                        <tbody>
                        {pta.documents.map(doc => 
                            <tr className="type" key={doc.id}>
                                <th>
                                    <FuseAnimate animation="transition.expandIn" delay={200}>
                                        <IconButton>
                                            <Icon className={classNames(classes.typeIcon, 'document', "text-48")}/>
                                        </IconButton>
                                    </FuseAnimate>
                                </th>
                                <th>
                                    <Typography>{doc.document.name}</Typography>
                                    <Button variant="contained" onClick={() => getPtaDocById(doc.document.url)} color="default" className={classes.button}>
                                        Download
                                        <Icon>cloud_download</Icon>
                                    </Button>
                                </th>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                }

                <Typography variant="subtitle1" component="h3" className="py-16">PTA Info</Typography>

                <table className={classNames(classes.table, "w-full, text-left")}>

                    <tbody>

                        <tr className="type">
                            <th>Amount&nbsp;</th>
                            <td>{formatter.format(pta.amountAppliedFor)}</td>
                        </tr>

                        <tr className="size">
                            <th>Type&nbsp;</th>
                            <td className="secondary">{pta.fxCategory.name}</td>
                        </tr>

                        <tr className="location">
                            <th>Branch&nbsp;</th>
                            <td>{pta.branch.name}</td>
                        </tr>

                        <tr className="owner">
                            <th>Owner&nbsp;</th>
                            <td>{pta.applicantName}</td>
                        </tr>

                        <tr className="modified">
                            <th>PickUp Date&nbsp;</th>
                            <td>{moment(pta.pickupDate).format('LLL')}</td>
                        </tr>

                        <tr className="created">
                            <th>Created&nbsp;</th>
                            <td>{moment(pta.createdAt).format('LLL')}</td>
                        </tr>

                        <tr className="created">
                            <th>
                                {pta.status === 1 || pta.status === 2 || pta.status === 3 || r.authorize === false? 
                                (
                                    <Button onClick={() => handleApprove(pta.id, true)} variant="contained" disabled color="secondary" className={classes.button}>
                                        Approve
                                    </Button>
                                ):(
                                    <Button onClick={() => openComposeDialog(pta.id, 'approve')} variant="contained" color="secondary" className={classes.button}>
                                        Approve
                                    </Button>
                                )
                                }
                            </th>
                            <td>
                                {pta.status === 2 || pta.status === 1 || pta.status === 3 || r.authorize === false?
                                (
                                    <Button onClick={() => handleDecline(pta.id, false)} variant="contained" disabled color="primary" className={classNames(classes.button,classes.bgColor)}>
                                        Decline
                                    </Button>
                                ):(
                                    <Button onClick={() => openComposeDialog(pta.id, 'decline')} variant="contained" color="primary" className={classNames(classes.button,classes.bgColor)}>
                                        Decline
                                    </Button>
                                )
                                }
                            </td>
                        </tr>

                    </tbody>
                </table>

                <PtaDialog />
            </div>
        </FuseAnimate>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        approvePta: Actions.approvePta,
        declinePta: Actions.declinePta,
        getPtaDocById: Actions.getPtaDocById,
        openComposeDialog: Actions.openComposeDialog,
    }, dispatch);
}

function mapStateToProps({fileManagerApp, auth})
{
    return {
        ptas        : fileManagerApp.pta.data,
        doc         : fileManagerApp.pta.doc,
        files       : fileManagerApp.files,
        selectedItem: fileManagerApp.selectedItem,
        rights      : auth.rights.right.rights
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSidebarContent)));
