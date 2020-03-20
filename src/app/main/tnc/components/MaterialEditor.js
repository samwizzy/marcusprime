import React, {Component} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom';
import {FuseAnimate} from '../../../../@fuse'
import { withStyles, Button, Typography } from '@material-ui/core'
import * as Actions from './../store/actions'
import { EditorState, convertToRaw, convertFromRaw, convertFromHTML, ContentState } from 'draft-js'
import {stateToHTML} from 'draft-js-export-html';
import _ from 'lodash'

const styles = theme => ({
    avatar: {
        margin: 10,
    }
})

class ControlledEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            form: this.props.tnc
        };
    }

    static getDerivedStateFromProps(props, state){
        if(props.tnc && props.tnc !== state.form){
            if(props.tnc.t_n_c){
                const rawContent = props.tnc.t_n_c;
                const blocksFromHTML = convertFromHTML(rawContent); // or htmlToDraft
                const DBEditorState = convertFromRaw(JSON.parse(props.tnc.t_n_c_edit))
                // console.log(DBEditorState, "Convert from raw");
                
                const stateEditor = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap,
                );
                // console.log(stateEditor, "Convert from Html");
                return {
                    editorState: EditorState.createWithContent(DBEditorState), // use this or below
                    // editorState: EditorState.createWithContent(stateEditor),
                    form: props.tnc
                }
            }else{
                return {
                    editorState: EditorState.createEmpty(),
                    form: props.tnc
                }
            }
        }
        return null
    }
  
    onEditorStateChange = (editorState) => {
        const state = editorState.getCurrentContent()
        const t_n_c_edit = JSON.stringify(convertToRaw(state))
        const t_n_c = stateToHTML(state);
        
        this.setState(_.set(this.state, 'editorState', editorState));
        this.setState(_.set(this.state.form, 't_n_c_edit', t_n_c_edit));
        this.setState(_.set(this.state.form, 't_n_c', t_n_c));
    }

    handleSubmit = (form) => {
        this.props.updateTnc(form)
    };

    render(){
        const { form, editorState } = this.state
        const { rights, user } = this.props
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Terms And Conditions'; });

        return (
            <React.Fragment>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <div style={{ maxWidth: '100%' }}>
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={this.onEditorStateChange}
                        />

                        <Button 
                            variant="contained"
                            color="primary"
                            disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                            onClick={(ev) => {
                                ev.stopPropagation();
                                this.handleSubmit(form);
                            }}
                        >
                            Save
                        </Button>
                        {!(r && r.cancreate || user.role && user.role.id === 1) && <Typography variant="caption">You do not have the right to change T&C</Typography>}
                    </div>
                </FuseAnimate>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateTnc: Actions.updateTnc,
        getTnc: Actions.getTnc,
    }, dispatch)
}

const mapStateToProps = ({tncApp, auth}) => {
    const { tnc } = tncApp
    return {
        tncs  : tnc.data,
        tnc   : tnc.tnc,
        user  : auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ControlledEditor)));