import React from 'react';
import {FusePageCarded} from '../../../@fuse';
import withReducer from '../../../app/store/withReducer';
import ReportsHeader from './components/ReportsHeader';
import ReportsTable from './components/ReportsTable';
import reducer from './store/reducers';

const Admins = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <ReportsHeader/>
            }
            content={
                <ReportsTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('reportsApp', reducer)(Admins);
