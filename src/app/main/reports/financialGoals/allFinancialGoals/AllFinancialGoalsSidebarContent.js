import React, {Component} from 'react';
import {withStyles, Avatar, Divider, Icon, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as Actions from '../../store/actions';
import {connect} from 'react-redux';

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

class AllProductsSidebarContent extends Component {

    render()
    {
        const {productCategories, getAllInvestments, classes } = this.props;

        return (
            <div className="p-16 lg:p-24 lg:pr-4">
                <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                    <Paper elevation={1} className="rounded-8">
                        <div className="p-24 flex items-center">
                            <Typography>Product Categories</Typography>
                        </div>
                        <Divider/>
                        <List>
                            <ListItem
                                button
                                component={NavLink}
                                to={'/pta/all'}
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    getAllInvestments(0)
                                }}
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon text-16" color="action">reorder</Icon>
                                <ListItemText className="truncate pr-0" primary="All P T A" disableTypography={true}/>
                            </ListItem>
                            {
                                productCategories.map(item =>

                                    <ListItem
                                        key={item.id}
                                        button
                                        component={NavLink}
                                        to={'/pta/' + item.id}
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            // getInvestmentsByProductCategory(item.id)
                                        }}
                                        activeClassName="active"
                                        className={classes.listItem}
                                    >
                                        <Icon className="list-item-icon text-16" color="action">reorder</Icon>
                                        <ListItemText className="truncate pr-0" primary={item.name} disableTypography={true} />
                                    </ListItem>
                                )
                            }
                        </List>
                    </Paper>
                </FuseAnimate>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getAllInvestments                      : Actions.getAllInvestments,
        // getInvestmentsByProductCategory        : Actions.getInvestmentsByProductCategory,
    }, dispatch);
}

function mapStateToProps({allFinancialGoalsApp})
{
    return {
        productCategories  : allFinancialGoalsApp.products.productCategories,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProductsSidebarContent)));
