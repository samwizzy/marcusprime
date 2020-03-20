import React, { Component } from 'react';
import { withStyles, Typography, FormControlLabel, Icon } from '@material-ui/core';
import { FuseAnimate } from '../../../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import AddButton from './AddButton'

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
    },
});


class AllInvestmentList extends Component {

    constructor(props) {
        super(props);
    }

    handleLink = link => {
        this.props.history.push(link);
    }

    render() {
        const { data, investments, filteredInvestments, isFiltering, classes } = this.props;

        const allInvestments = isFiltering? filteredInvestments : data

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
                name: "externalRefId",
                label: "Trade Reference",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "action",
                label: "Action",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "createdAt",
                label: "Request Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(day).format('DD-MM-YYYY')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "tradeDate",
                label: "Trade Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(day).format('DD-MM-YYYY')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "currency",
                label: "Currency",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "nominal",
                label: "Nominal",
                options: {
                    filter: true,
                    customBodyRender: nominal => {
                        return new Intl.NumberFormat("en-NG", {}).format(nominal);
                    }
                }
            },
            {
                name: "settlementDate",
                label: "Settlement Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(day).format('DD-MM-YYYY')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "createdAt",
                label: "Request Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(day).format('DD-MM-YYYY')}
                            </Typography>
                        )
                    }
                }
            },
        ];

        const headerNames = [
            {
              name: 'S/N',
              download: true,
            },
            {
              name: 'Trade Reference',
              download: true,
            },
            {
              name: 'Action',
              download: true,
            },
            {
              name: 'Request Date',
              download: true,
            },
            {
              name: 'Trade Date',
              download: true,
            },
            {
              name: 'Currency',
              download: true,
            },
            {
              name: 'Nominal',
              download: true,
            },
            {
              name: 'Settlement Date',
              download: true,
            },
            {
              name: 'Request Date',
              download: true,
            },
        ];

        const footerNames = ['S/N', 'Trade Reference', 'Action', 'Request Date', 'Trade Date', 'Currency', 'Nominal', 'Settlement Date', 'Request Date'];


        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            customSearch: (searchQuery, currentRow, columns) => {
                let isFound = false;
                currentRow.forEach(col => {
                    if (col !== null && moment(col.toString(), moment.ISO_8601, true).isValid()) {
                        if (moment(col.toString()).format('DD-MM-YYYY').indexOf(searchQuery) >= 0) {
                            isFound = true;
                        }
                    } else {
                        if (col !== null && col.toString().indexOf(searchQuery) >= 0) {
                            isFound = true;
                        }
                    }
                });
                return isFound;
            },
            customToolbar: () => {
                return (
                    <AddButton investments={data} />
                );
            },
            downloadOptions: {filename: 'AllInvestmentsList.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                const categoriesIndex = columns.findIndex(c => c.label === "Nominal");
                const datas = data.map(item =>  {
                    if (categoriesIndex > -1) {
                        item.data[categoriesIndex] = new Intl.NumberFormat('en-NG', {}).format(item.data[categoriesIndex]);
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
        };

        return (
            <div className={classes.root}>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <MUIDataTable
                        title={"All Investments"}
                        data={allInvestments}
                        columns={columns}
                        options={options}
                    />
                </FuseAnimate>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({ allInvestmentsApp }) {
    console.log(allInvestmentsApp.investments.investments, "investments")
    return {
        investments: allInvestmentsApp.investments.investments,
        filteredInvestments: allInvestmentsApp.investments.filteredInvestments,
        isFiltering: allInvestmentsApp.investments.isFiltering,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(AllInvestmentList)));
