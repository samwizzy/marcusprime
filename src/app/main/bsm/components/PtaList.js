import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MUIDataTable from 'mui-datatables'
import PtaDialog from './PtaDialog'
import { withStyles, Icon, Typography, Button, TableRow, TableCell } from '@material-ui/core'
import * as Actions from './../store/actions'
import _ from 'lodash'
import classNames from 'classnames'
import Loader from 'react-loader-spinner'
import moment from 'moment'

const styles = theme => ({
    root: {
        maxWidth: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing.unit,
    },
    bgColor: {
        backgroundColor: 'red'
    }
})

class PtaList extends React.Component {
    state = {
        data: [],
        pta: {},
        composeDialog: false
    }

    componentDidMount(){
        this.props.getPta()
        // const params = {b_id: 4, cat_id: 1}
        // this.props.getPtaByCatAndBranch(params)
    }

    componentDidUpdate(props, state){
        if(this.props.user !== props.user){
            // const {branchCode, role, adUserID } = this.props.user
            const { role, adUserID } = this.props.user
            if(role && role.name === 'BSM'){
                this.props.getBranchByBsm(adUserID)
            }
        }
        if(this.props.branches !== props.branches){
            const { adUserID } = this.props.user
            const branch = this.props.branches.find(br => br.bsmId === adUserID)
            const params = {b_id: branch.id, cat_id: 1}
            // this.props.getPtaByCatAndBranch(params)
        }
        if(this.props.doc !== props.doc){
            const { doc } = this.props
            this.downloadImage(doc)
        }
    }

    downloadImage = (doc) => {
        const linkSource = `data:application/octet-stream;base64,${doc.documentContent}`;
        const downloadLink = document.createElement("a");
        const fileName = `${doc.documentName}${doc.extension}`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    static getDerivedStateFromProps(props, state){
        if(props.ptas !== state.data){
            return {
                data: props.ptas
            }
        }
        return null
    }

    handleApprove = (id, status) => {
        const data = { fxId: id, status}
        this.props.approvePta(data)
    }

    handleUnapprove = (id, status) => {
        const data = { fxId: id, status}
        this.props.declinePta(data)
    }

    render() {
        const { classes, ptas, rights, openComposeDialog } = this.props
        const selectedPtas = _.orderBy(ptas, ['createdAt'], ['desc']);

        console.log(rights, "Rights following")

        const columns = [
            {
                name: "id",
                label: "ID",
                options: {
                    display: 'excluded',
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "id",
                label: "Amount",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: id => {
                        const pta = ptas && ptas.find(p => p.id === id)
                        return (
                            <Typography variant="subtitle2">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: pta.currencyCode }).format(pta.amountAppliedFor)}
                            </Typography>
                        );
                    }
                }
            },
            {
                name: "applicantName",
                label: "Applicant Name",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
             name: "id",
             label: "Status",
             options: {
                customBodyRender: id => {
                    const nPta = ptas.find(p => p.id === id)
                    return (
                        <Typography variant="subtitle2">
                            {nPta.status === 0? "Unattended" : nPta.status === 1? "Approved": nPta.status === 2?"Declined":"Cancelled"}
                        </Typography>
                    );
                },
             }
            },
            {
                name: "pickupDate",
                label: "Pickup Date",
                options: {
                    customBodyRender: pickupDate => {
                        return (
                            <Typography variant="subtitle2">
                                {pickupDate? moment(pickupDate).format('LLL') : ''}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "createdAt",
                label: "Date Created",
                options: {
                    customBodyRender: createdAt => {
                        return (
                            <Typography variant="subtitle2">
                                {createdAt? moment(createdAt).format('LLL') : ''}
                            </Typography>
                        )
                    }
                }
            },
            {
             name: "id",
             label: " ",
             options: {
                customBodyRender: id => {
                    const pta = ptas.find(pta => pta.id === id)
                    if(pta.status === 1 || pta.status === 2 || pta.status === 3){
                        return (
                            <React.Fragment>
                                <Button onClick={() => this.handleApprove(id, true)} variant="contained" disabled color="secondary" className={classes.button}>
                                    Approve
                                </Button>
                            </React.Fragment>
                        )
                    }else{
                        return (
                            <React.Fragment>
                                <Button onClick={() => openComposeDialog(id, 'approve')} variant="contained" color="secondary" className={classes.button}>
                                    Approve
                                </Button>
                            </React.Fragment>
                        )
                    }
                },
             }
            },
            {
             name: "id",
             label: " ",
             options: {
                customBodyRender: id => {
                    const pta = ptas.find(pta => pta.id === id)
                    if(pta.status === 2 || pta.status === 1 || pta.status === 3){
                        return (
                            <React.Fragment>
                                <Button onClick={() => this.handleUnapprove(id, false)} variant="contained" disabled color="primary" className={classNames(classes.button,classes.bgColor)}>
                                    Decline
                                </Button>
                            </React.Fragment>
                        )
                    }else{
                        return (
                            <React.Fragment>
                                <Button onClick={() => openComposeDialog(id, 'decline')} variant="contained" color="primary" className={classNames(classes.button,classes.bgColor)}>
                                    Decline
                                </Button>
                            </React.Fragment>
                        )
                    }
                },
             }
            }
        ];        

        const options = {
            filter: true,
            filterType: "dropdown",  //"stacked"
            responsive: "scrollMaxHeight",
            selectableRows: 'none',
            textLabels: {
                body: {
                    noMatch: <Loader type="Oval" color="#039be5" height={60} width={60} timeout={5000} />,
                    toolTip: "Sort",
                    columnHeaderTooltip: column => `Sort for ${column.label}`
                },
            },
            expandableRows: true,
            expandableRowsOnClick: false,
            rowsExpanded: [0, 2, 3],
            renderExpandableRow: (rowData, rowMeta) => {
                const pta = ptas.find(pta => pta.id === rowData[0])
                console.log(rowData.length, "rowData.length")
                return (
                    <React.Fragment>
                        <TableRow>
                            <TableCell variant="head" colSpan={3}>Document Name</TableCell>
                            <TableCell variant="head" colSpan={3}>Document Type</TableCell>
                            <TableCell variant="head" colSpan={2} align="left"></TableCell>
                        </TableRow>
                        {pta.documents && pta.documents.map(doc => 
                            <TableRow key={doc.id}>
                                <TableCell variant="body" colSpan={3}>
                                    {doc.document.name}
                                </TableCell>
                                <TableCell variant="body" colSpan={3}>
                                    {doc.doctype.name}
                                </TableCell>
                                <TableCell variant="body" colSpan={2}>
                                    <Button variant="contained" href="" onClick={() => this.props.getPtaDocById(doc.document.url)} color="default" className={classes.button}>
                                        Download
                                        <Icon>cloud_download</Icon>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </React.Fragment>
                );
            },
            print: false,
            download: false,
            viewColumns: false,
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'ptaList.csv', separator: ','}
        };


      return (
        <React.Fragment>  
            <div style={{ maxWidth: '100%' }}>
                <MUIDataTable
                    title={"PTA List (Approved & Unapproved)"}
                    data={selectedPtas}
                    columns={columns}
                    options={options}
                />
            </div>

            <PtaDialog />
        </React.Fragment>  
      )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getPta: Actions.getPta,
        getPtaById: Actions.getPtaById,
        getPtaDocById: Actions.getPtaDocById,
        getPtaByCatAndBranch: Actions.getPtaByCatAndBranch,
        openComposeDialog: Actions.openComposeDialog,
        getBranchByBsm: Actions.getBranchByBsm,
        approvePta: Actions.approvePta,
        declinePta: Actions.declinePta,
    }, dispatch)
}

const mapStateToProps = ({ptaApp, auth}) => {
    const { pta, branch } = ptaApp
    return {
        ptas    : pta.data,
        pta     : pta.pta,
        doc     : pta.doc,
        branches: branch.data,
        user    : auth.user.data,
        rights  : auth.rights.right.rights,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PtaList));