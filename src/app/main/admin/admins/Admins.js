import React from 'react';
import {FusePageCarded} from '../../../../@fuse';
import withReducer from '../../../../app/store/withReducer';
import AdminsHeader from './AdminsHeader';
import AdminsTable from './AdminsTable';
import AdminDetails from './../admin/AdminDetails';
import AdminToolbar from './../admin/AdminToolbar';
import reducer from '../store/reducers';

const Admins = (props) => {
    const {match} = props;
    const {params} = match;

    return (
        <FusePageCarded
            classes={{
                root   : "w-full",
                content: "flex flex-col",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <AdminsHeader/>
            }
            contentToolbar={
                params.id ? (
                    <AdminToolbar/>
                ) : (
                    <div/>
                )
            }
            content={
                params.id ? (
                    <AdminDetails/>
                ) : (
                    <AdminsTable/>
                )
            }
            innerScroll
        />
    );
};

export default withReducer('adminApp', reducer)(Admins);
