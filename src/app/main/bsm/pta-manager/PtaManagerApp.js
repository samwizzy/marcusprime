import React, {Component} from 'react';
import {Fab, Icon, IconButton, Typography} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '../../../../@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from '../../../../app/store/withReducer';
import PtaList from './PtaList';
import DetailSidebarHeader from './DetailSidebarHeader';
import DetailSidebarContent from './DetailSidebarContent';
import MainSidebarHeader from './MainSidebarHeader';
import MainSidebarContent from './MainSidebarContent';
import * as Actions from './../store/actions';
import reducer from './../store/reducers';

class PtaManagerApp extends Component {

    componentDidMount()
    {
        this.props.getFiles();
        const { adUserID, role } = this.props.user
        if(role && role.name === 'BSM'){
            this.props.getBranchByBsm("samwize19")
        }
        this.props.getBranchByBsm("samwize19")   
        this.props.getPta()     
    }

    componentDidUpdate(){
        // getting the branch by BSM and get the ptas by your branch ID
        // if(this.props.branches !== props.branches){
        //     const {branchCode, role, adUserID } = this.props.user
        //     const branch = this.props.branches.find(br => br.bsmId === adUserID)
        //     console.log(branch.id, "Branch Tower shit")
        //     const params = {b_id: branch.id, cat_id: 1}
        //     // this.props.getPtaByCatAndBranch(params)
        // }
    }

    render()
    {
        const {selectedItem, files} = this.props;
        const selected = files[selectedItem];
        const titles = 'My PTA > Documents';

        function Breadcrumb({className})
        {
            const arr = titles.split('>');

            return (
                <Typography className={className}>
                    {arr.map((path, i) => (
                        <span key={i} className="flex items-center">
                            <span>{path}</span>
                            {arr.length - 1 !== i && (
                                <Icon>chevron_right</Icon>
                            )}
                        </span>))}
                </Typography>
            )
        }

        return (
            <FusePageSimple
                classes={{
                    header       : "h-96 min-h-96 sm:h-160 sm:min-h-160",
                    sidebarHeader: "h-96 min-h-96 sm:h-160 sm:min-h-160",
                    rightSidebar : "w-320"
                }}
                header={
                    <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                        <div className="flex items-center justify-between">
                            <IconButton
                                onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                aria-label="open left sidebar"
                            >
                                <Icon>menu</Icon>
                            </IconButton>
                            <FuseAnimate animation="transition.expandIn" delay={200}>
                                <IconButton aria-label="search">
                                    <Icon>search</Icon>
                                </IconButton>
                            </FuseAnimate>
                        </div>
                        <div className="flex flex-1 items-end">
                            <FuseAnimate delay={200}>
                                <div>
                                    {selected && (
                                        <Breadcrumb className="flex flex-1 pl-72 pb-12 text-16 sm:text-24"/>
                                    )}
                                </div>
                            </FuseAnimate>
                        </div>
                    </div>
                }
                content={
                    <PtaList pageLayout={() => this.pageLayout}/>
                }
                leftSidebarVariant="temporary"
                leftSidebarHeader={
                    <MainSidebarHeader/>
                }
                leftSidebarContent={
                    <MainSidebarContent/>
                }
                rightSidebarHeader={
                    <DetailSidebarHeader/>
                }
                rightSidebarContent={
                    <DetailSidebarContent/>
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getFiles: Actions.getFiles,
        getPta: Actions.getPta,
        getBranchByBsm: Actions.getBranchByBsm,
        getPtaByCatAndBranch: Actions.getPtaByCatAndBranch,
    }, dispatch);
}

function mapStateToProps({fileManagerApp, auth})
{
    console.log(fileManagerApp, "fileManagerApp")
    return {
        files       : fileManagerApp.files,
        selectedItem: fileManagerApp.selectedItem,
        user        : auth.user.data,
        branches    : fileManagerApp.branch.data,
    }
}

export default withReducer('fileManagerApp', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PtaManagerApp)));
