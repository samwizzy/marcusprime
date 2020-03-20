import React, { Component } from 'react';
import { FormControlLabel, Button, withStyles, Icon } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../store/actions';
import AddButton from './AddButton';
import _ from 'lodash';

const styles = theme => ({
    listItem: {
        color: 'inherit!important',
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
        '&.active': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText + '!important',
            pointerEvents: 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    }
});

class BranchList extends Component {

    render() {
        const { openNewRateDialog, openEditRateDialog, data, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Branches'; });

        const columns = [
            {
                name: "id",
                label: "S/N",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <FormControlLabel
                                label={tableMeta.rowIndex + 1}
                                control={
                                    <Icon></Icon>
                                }
                            />
                        );

                    }
                }
            },
            {
                name: "code",
                label: "Branch Code",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "name",
                label: "Branch Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "state",
                label: "Branch State",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "bsmId",
                label: "BSM Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "htnId",
                label: "HT Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "id",
                label: " ",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        // this.logClick(value, tableMeta)
                        const branch = data.find(bran => bran.id === value);
                        console.log(branch, 'branch taf');
                        return (
                            <FormControlLabel
                                control={
                                    <Button  
                                    variant="contained" 
                                    color="primary"
                                    disabled={!(r && r.canedit || user.role && user.role.name.toLowerCase() === 'super admin')}
                                    >
                                        edit
                                    </Button>
                                }
                                onClick={evt => {
                                    //TODO: userId hard coded here base on array index 'tableMeta.rowData[4]'
                                    // this.logClick(value, evt.target.value, tableMeta);
                                    openEditRateDialog(branch);
                                    // updateProduct(tableMeta.rowData);
                                }}
                            />
                        );

                    }
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            customToolbar: () => {
                return (
                    <AddButton
                        canCreate={r && r.cancreate || user.role && user.role.name.toLowerCase() === 'super admin'}
                        openNewRateDialog={openNewRateDialog}
                    />
                );
            },
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'branchList.csv', separator: ','},
            filter: false
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"All Branches"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openNewRateDialog: Actions.openNewRateDialog,
        openEditRateDialog: Actions.openEditRateDialog,
    }, dispatch);
}

function mapStateToProps({ branchesApp, auth }) {
    return {
        user  : auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(BranchList)));
