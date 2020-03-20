 import React, { Component } from 'react';
import { Button, Switch, Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from '@material-ui/core';
import { FuseUtils, FuseAnimate, FusePageSimple } from '../../../@fuse';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
// import AccountView from './AccountView';
import * as Actions from './store/actions';

class ProductsByCategoryList extends Component {

    state = {
        selectedContactsMenu: null,
    };

    // handleChange = name => event => {
    //     console.log(name, 'name');
    //     console.log(event, 'event');
    //     this.setState({ name: event.target.checked });
    //   };

    componentDidMount(){
        // this.props.getAccounts();
    }

    handleClick = (id) => {
        this.props.history.push('/apps/accounts/user/' + id);
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedContactMenu = (event) => {
        this.setState({ selectedContactsMenu: event.currentTarget });
    };

    closeSelectedContactsMenu = () => {
        this.setState({ selectedContactsMenu: null });
    };

    render() {
        const {accounts, user, searchText, selectedContactIds, selectAllContacts, deSelectAllContacts, toggleInSelectedContacts, openEditContactDialog } = this.props;
        const data = this.getFilteredArray(accounts, searchText);
        const { selectedContactsMenu } = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no product category!
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick: (e, handleOriginal) => {
                                if (rowInfo) {
                                    openEditContactDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header: () => (
                                <Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onChange={(event) => {
                                        event.target.checked ? selectAllContacts() : deSelectAllContacts();
                                    }}
                                    checked={selectedContactIds.length === Object.keys(accounts).length && selectedContactIds.length > 0}
                                    indeterminate={selectedContactIds.length !== Object.keys(accounts).length && selectedContactIds.length > 0}
                                />
                            ),
                            accessor: "",
                            Cell: row => {
                                return (<Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    checked={selectedContactIds.includes(row.value.id)}
                                    onChange={() => toggleInSelectedContacts(row.value.id)}
                                />
                                )
                            },
                            className: "justify-center",
                            sortable: false,
                            width: 64
                        },
                        {
                            Header: "Name",
                            accessor: "name",
                            filterable: true,
                            className: "font-bold"
                        },
                        {
                            Header: "Type",
                            accessor: "investmentType.name",
                            filterable: true,
                            // className: "font-bold"
                        },
                        {
                            Header: "Tags",
                            accessor: "investmentType.tags",
                            filterable: true,
                            // className: "font-bold"
                        },
                        {
                            Header: "",
                            width: 128,
                            Cell: row => (
                                <div className="flex items-center">
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            this.handleClick(row.original.id);
                                        }}
                                    >
                                        <Icon>visibility</Icon>
                                    </IconButton>
                                    
                                    { row.original.enable === true ? (
                                        <Switch
                                        value={false}
                                        checked={row.original.enable}
                                        onChange={(ev) => {
                                            // disableAccount(row.original.id, false);
                                        }}
                                    />
                                    ) : (
                                        <Switch
                                        checked={row.original.enable}
                                        value={true}
                                        onChange={(ev) => {
                                            // disableAccount(row.original.id, true);
                                        }}
                                    />
                                    )}
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No accounts found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getProductsByCategory: Actions.getProductsByCategory,
        toggleInSelectedContacts: Actions.toggleInSelectedContacts,
        selectAllContacts: Actions.selectAllContacts,
        deSelectAllContacts: Actions.deSelectAllContacts,
        openEditContactDialog: Actions.openEditContactDialog,
    }, dispatch);
}

function mapStateToProps({ productCategoriesApp }) {
    return {
        accounts: productCategoriesApp.productCategories.entities,
        selectedContactIds: productCategoriesApp.productCategories.selectedContactIds,
        searchText: productCategoriesApp.productCategories.searchText,
        user: productCategoriesApp.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsByCategoryList));
