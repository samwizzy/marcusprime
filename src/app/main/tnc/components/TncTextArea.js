import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom';
import TncDialog from './TncDialog'
import {FuseAnimate} from '../../../../@fuse'
import { withStyles } from '@material-ui/core'
import * as Actions from './../store/actions'
import { convertToRaw } from 'draft-js'
import MUIRichTextEditor from "mui-rte"
import {stateToHTML} from 'draft-js-export-html';
import _ from 'lodash'

const styles = theme => ({
    avatar: {
        margin: 10,
    },
})

class TncTextArea extends React.Component {

    state = {
        composeDialog: false,
        form: {
            id: '',
            t_n_c: '',
            t_n_c_edit: ''
        }
    }

    static getDerivedStateFromProps(props, state){
        if(props.tncs.length > 0){
            const [tnc] = props.tncs
            return {
                form: tnc
            }
        }
        return null
    }

    openComposeDialog = () => {
        this.setState({composeDialog: true});
    };

    closeComposeDialog = () => {
        this.setState({...this.state, composeDialog: false});
    };

    handleChipChange = (event) => {
        const { name, value } = event.target
        const { tncs } = this.props
        const form = tncs && tncs.find(tnc => tnc.id === value)
        this.setState({form})
    }

    handleChange = (editorState) => {
        const state = editorState.getCurrentContent()
        const html = stateToHTML(state);
        const content = JSON.stringify(convertToRaw(state))
        this.setState(_.set(this.state.form, "t_n_c", html))
        this.setState(_.set(this.state.form, "t_n_c_edit", content))
    }

    handleSubmit = (data) => {
        this.props.updateTnc(this.state.form)
    };

    render() {
        const { form } = this.state

        console.log(form, "Form Updated")

        return (
            <React.Fragment>  
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <div style={{ maxWidth: '80%' }}>

                        {form.t_n_c_edit &&
                            <MUIRichTextEditor 
                                label="Start typing..." 
                                name="t_n_c"
                                value={form.t_n_c_edit} 
                                onChange={this.handleChange} 
                                onSave={this.handleSubmit}
                            />
                        }

                        <TncDialog 
                            composeDialog={this.state.composeDialog}
                            closeComposeDialog={this.closeComposeDialog}
                        />
                    </div>
                </FuseAnimate>
            </React.Fragment>  
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateTnc: Actions.updateTnc,
    }, dispatch)
}

const mapStateToProps = ({tncApp}) => {
    console.log(tncApp, "Toc App Dmn")
    const { tnc } = tncApp
    return {
        tncs: tnc.data
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TncTextArea)));