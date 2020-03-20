import React, {Component} from 'react';
import {FormControlLabel, Switch, withStyles, Avatar, Divider, Icon, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import {FuseAnimate} from '../../../../../../@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
// import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";

const styles = theme => ({
    listItem: {
        color         : 'inherit!important',
        textDecoration: 'none!important',
        height        : 40,
        width         : 'calc(100% - 16px)',
        borderRadius  : '0 20px 20px 0',
        paddingLeft   : 24,
        paddingRight  : 12,
        '&.active'    : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    }
});

class FailedFinancialGoals extends Component {

    render()
    {
        const { data } = this.props;

        const columns = [
            {
                name: "faceValue",
                label: "Face Value",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "amountInvested",
                label: "Amount Invested",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "custodyFee",
                label: "Custody Fee",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "vat",
                label: "Vat",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "tenor",
                label: "Tenor",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "product.productCategory.name",
                label: "Category",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "createdAt",
                label: "Created By",
                options: {
                    filter: true,
                    sort: false,
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scroll'
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"All Success Financial Goals"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({allProductsApp})
{
    return {
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FailedFinancialGoals)));
