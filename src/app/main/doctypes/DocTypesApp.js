import React from 'react';
import { withStyles, Button, Icon, Typography, TextField, InputAdornment } from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {FuseExample, FusePageSimple, FuseChipSelect } from '../../../@fuse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withReducer from '../../../app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import DocTypesList from './components/DocTypesList';

const styles = theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class DocTypesApp extends React.Component {

    state = {
        tabValue: 0,
        form    : {},
        options : null,
        canSubmit: false
    };

    componentDidMount(){
        this.props.getDocTypes()
    }

    canBeSubmitted(){
        const {name} = this.state.form;
        return (
            name.length > 0 &&
            !_.isEqual(this.props.product.data, this.state.form)
        );
    }

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
    };

    handleChange = (event) => {
        this.formSubmitted();
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    render(){
        const { classes } = this.props
        
        return (
            <FusePageSimple
                content={
                    <div className="p-24">
                        <DocTypesList />
                    </div>
                }
            />
        )
    };
};

const mapStateToProps = ({docTypesApp}) => {
    console.log(docTypesApp, "docTypesApp")
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getDocTypes: Actions.getDocTypes
    }, dispatch)
}

export default withReducer('docTypesApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(DocTypesApp)));