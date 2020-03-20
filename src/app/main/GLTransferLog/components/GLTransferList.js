import React, { Component } from 'react';
import { FormControlLabel, Switch, Typography, withStyles, Icon, Button } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../store/actions';
import _ from 'lodash';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import AddButton from './AddButton'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    bgColor: {
        backgroundColor: 'red'
    },
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

class GLTransferList extends Component {

    render() {
        const { logs, classes, openTransferDialog, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'GL Transfer Log'; });

        var data = _.orderBy(logs, ['createdAt'], ['desc']);

        console.log(data, 'transfer data')

        const columns = [
            {
                name: "id",
                label: "S/N",
                options: {
                    display: "excluded",
                    filter: true,
                    customBodyRender: id => {
                        return (
                            <FormControlLabel
                                label={'label'}
                                control={
                                    <Icon></Icon>
                                }
                            />
                        );
                    }
                }
            },
            {
                name: "creditAccountName",
                label: "Credit GL Name",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "creditAccountNumber",
                label: "Credit GL Number",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "debitAccountName",
                label: "Debit GL Name",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "debitAccountNumber",
                label: "Debit GL Number",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "currency",
                label: "Currency",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "amount",
                label: "Amount",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: amount => {
                        return new Intl.NumberFormat("en-US", {}).format(amount);
                    }
                }
            },
            {
                name: "initBranchCode",
                label: "Branch Code",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "creditAccountBankCode",
                label: "Credit Account BankCode",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "paymentReference",
                label: "Transaction Reference",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "debitNarration",
                label: "Debit Narration",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "creditNarration",
                label: "Credit Narration",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "valueDate",
                label: "Value Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        if(day === null || day == "") return ""
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(day).format('lll')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "id",
                label: "Transfer",
                options: {
                    display: "excluded",
                    customBodyRender: id => {
                        const trans = data.find(d => d.id === id);
                        return (
                            <React.Fragment>
                                <Button 
                                    onClick={() => openTransferDialog(trans)} 
                                    variant="contained" 
                                    color="secondary" 
                                    className={classes.button}
                                    disabled={!(r && r.authorize || user.role && user.role.id === 1)}
                                >
                                    Approve
                                </Button>
                            </React.Fragment>
                        )
                    },
                },
            }
        ];

        const headerNames = [
            {
              name: 'S/N',
              download: true,
            },
            {
              name: 'Credit GL Name',
              download: true,
            },
            {
              name: 'Credit GL Number',
              download: true,
            },
            {
              name: 'Debit GL Name',
              download: true,
            },
            {
              name: 'Debit GL Number',
              download: true,
            },
            {
              name: 'Currency',
              download: true,
            },
            {
              name: 'Amount',
              download: true,
            },
            {
              name: 'Branch Code',
              download: true,
            },
            {
              name: 'Credit Account BankCode',
              download: true,
            },
            {
              name: 'Transaction Reference',
              download: true,
            },
            {
              name: 'Debit Narration',
              download: true,
            },
            {
              name: 'Credit Narration',
              download: true,
            },
            {
              name: 'Value Date',
              download: true,
            },
            {
              name: 'Transfer',
              download: true,
            }
        ];

        const footerNames = ['S/N', 'Credit GL Name', 'Credit GL Number', 'Debit GL Name', 'Debit GL Number', 'Currency', 'Amount', 'Branch Code', 'Credit Account BankCode', 'Transaction Reference', 'Debit Narration', 'Credit Narration', 'Value Date', 'Transfer'];


        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25, 50, 100],
            customToolbar: () => {
                return (
                    <AddButton 
                        canCreate={(r && r.cancreate || user.role && user.role.id === 1)}
                    />
                );
            },
            downloadOptions: { filename: 'GLTransferLogs.csv', separator: ',' },
            onDownload: (buildHead, buildBody, columns, data) => {
                const categoriesIndex = columns.findIndex(c => c.label === "Amount");
                const transferApproveIndex = columns.findIndex(c => c.label === "Transfer");
                const datas = data.map(item =>  {
                    if (categoriesIndex > -1) {
                        const amount = new Intl.NumberFormat('en-NG', {}
                        ).format(item.data[categoriesIndex]);
                        item.data[categoriesIndex] = amount
                        item.data[transferApproveIndex] = ""
                      return {
                          ...item,
                          data: item.data.map(m => moment(m, moment.ISO_8601, true).isValid() ? moment(m).format('lll') : m )
                      }
                    }
                })
                return (
                    buildHead(headerNames) +
                    buildBody(
                        datas.concat({
                            index: data.length,
                            data: footerNames,
                        }),
                    )
                )
            },
            textLabels: {
                body: {
                    noMatch: <Loader type="Oval" color="#FCED00" height={50} width={50} timeout={5000} />,
                    toolTip: "Sort",
                    columnHeaderTooltip: column => `Sort for ${column.label}`
                }
            },
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"GL Transfer Logs"}
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
        openTransferDialog: Actions.openTransferDialog,
    }, dispatch);
}

function mapStateToProps({ glTransferApp, auth }) {
    const { transferLog } = glTransferApp
    console.log(transferLog, "transferLog")
    return {
        logs: transferLog.data,
        user: auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(GLTransferList)));
