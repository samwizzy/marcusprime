import React, { Component } from 'react';
import { Card, CardContent, FormGroup, FormLabel, FormControl, FormControlLabel, Radio, RadioGroup, Checkbox, Typography, TextField, MenuItem, withStyles, Button, IconButton, Icon } from '@material-ui/core';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw, convertFromHTML, ContentState } from 'draft-js'
import {stateToHTML} from 'draft-js-export-html';
import { FuseAnimate } from '../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import CustomerSelect from './CustomerSelect'
import Loader from 'react-loader-spinner'
import moment from 'moment';
import _ from 'lodash';
import MultiChipSelect from './MultiChipSelect'

const styles = theme => ({
    root: {
        maxWidth: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
});

class NotificationForm extends Component {

    state = {
        inputValue: "",
        selectedItem: [],
        items: this.props.customers,
        editorState: EditorState.createEmpty(),
        type: {
            email: false,
            sms: false,
            push: false
        },
        group: "",
        form: {
            recipients: [],
            subject: '',
            body: ''
        },
        smsForm: {
            message: "",
            recipient: ""
        },
        pushForm: {
            message: "",
            title: "",
            topic: ""
        },
        uuids: []
    }

    componentDidMount(){
        this.props.getCustomers()
    }

    componentDidUpdate(props, state){
        if(props.selectedCustomers !== this.props.selectedCustomers){
            const phoneSet = this.props.selectedCustomers.map(customer => customer.phoneNumber).join(',')
            const customerSet = this.props.selectedCustomers.map(customer => {
                const {id, email, firstName} = customer
                const selectedUser = {id, email, displayName: firstName, recipientType: "TO"}
                return selectedUser;
            });
            this.setState({form: _.set({...this.state.form}, 'recipients', customerSet)});
            this.setState({smsForm: _.set({...this.state.smsForm}, 'recipient', phoneSet)});
        } else if(props.customers !== this.props.customers){
            this.setState({items: this.props.customers});
        }
    }


    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
      
        if(event.target.name === 'subject'){
            this.setState({pushForm: _.set({...this.state.pushForm}, "title", event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
        }
    };

    handleCheck = (event, name) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? _.set({...this.state[event.target.name]}, name, event.target.checked) : event.target.value));   
    }

    handleSelected = item => {
        const user = this.props.customers.find(customer => customer.username === item)
        const {id, email, firstName, phoneNumber, uuid} = user
        const selectedUser = {id, email, displayName: firstName, recipientType: "TO"}
        const phones = this.state.smsForm.recipient? this.state.smsForm.recipient.split(',') : [] 
        const selectedPhone = [...phones, phoneNumber]

        this.setState({form: _.set({...this.state.form}, 'recipients', [...this.state.form.recipients, selectedUser] )});
        this.setState({smsForm: _.set({...this.state.smsForm}, 'recipient', selectedPhone.join(',') )});
        this.setState({uuids: [...this.state.uuids, uuid]});
    }

    removeSelected = item => {
        const user = this.props.customers.find(customer => customer.username === item)
        const {id, email, uuid, phoneNumber} = user

        // console.log("I am trying to remove a customer from", this.state.form.recipients)
        this.setState(({form}) => ({
            form: {
                ...form,
                recipients: form.recipients.filter(i => i.email.toLowerCase() !== email.toLowerCase())
            },
        }));

        this.setState(({smsForm}) => ({
            smsForm: {
                ...smsForm,
                recipient: smsForm.recipient.split(',').filter(phone => phone !== phoneNumber).join(',')
            },
        }));

        this.setState(state => ({
            uuids: state.uuids.filter(uid => uid !== uuid)
        }))
    }

    onEditorStateChange = (editorState) => {
        const state = editorState.getCurrentContent()
        const html = stateToHTML(state);
        
        this.setState(_.set(this.state, 'editorState', editorState));
        this.setState({form: _.set({...this.state.form}, 'body', html )});
        this.setState({smsForm: _.set({...this.state.smsForm}, 'message', this.stripHtml(html) )});
        this.setState({pushForm: _.set({...this.state.pushForm}, 'message', this.stripHtml(html) )});
    }

    canBeSubmitted = () => {
        const {subject, body} = this.state.form
        return subject.length > 0 && body.length > 0
    }

    handleSubmit = () => {
        const types = _.pickBy(this.state.type, _.identity)
        const { email, sms, push } = this.state.type
        const { group, form, smsForm, pushForm } = this.state

        for(let i in types){
            if(i === 'email'){
                this.props.saveEmail(form)
            }else if(i === 'sms'){
                this.props.saveSMS(smsForm)
            }else if(i === 'push'){
                const reform = {}
                if(group === 'low'){
                    reform = {...pushForm, topic: "LOWRISK"}
                    this.props.savePushNotification(reform)
                }else if(group === "high"){
                    reform = {...pushForm, topic: "HIGHRISK"}
                    this.props.savePushNotification(reform)
                }else if(group === "all"){
                    reform = {...pushForm, topic: "LOWRISK"}
                    this.props.savePushNotification(reform)
                    reform = {...pushForm, topic: "HIGHRISK"}
                    this.props.savePushNotification(reform)
                }else{
                    this.state.uuids.forEach(uuid => {
                        this.props.sendPushNotification(uuid, pushForm)
                    })
                }
            }
        }
    }

    stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }


    handleXhange = selectedItem => {
        if (this.state.selectedItem.includes(selectedItem)) {
            this.removeSelectedItem(selectedItem);
        } else {
            this.addSelectedItem(selectedItem);
            this.handleSelected(selectedItem)
        }
    };

    addSelectedItem(item) {
        this.setState(({ selectedItem, items }) => ({
            inputValue: "",
            selectedItem: [...selectedItem, item],
            items: items.filter(i => i.name !== item)
        }));
    }

    removeSelectedItem = item => {
        this.setState(({ selectedItem, items }) => ({
            inputValue: "",
            selectedItem: selectedItem.filter(i => i !== item),
            items: [...items, { name: item, id: item.toLowerCase() }]
        }));

        this.removeSelected(item);
    };

    handleChangeInput = inputVal => {
        const t = inputVal.split(",");
        if (JSON.stringify(t) !== JSON.stringify(this.state.selectedItem)) {
            this.setState({ inputValue: inputVal });
        }
    };


    render() {
        const { rights, customers, classes, user } = this.props;
        const {editorState, form, type, group, selectedItem, items} = this.state;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Notifications'; });
        console.log(this.state, "Form state")

        return (
            <FuseAnimate animation={{translateX: [0, '100%']}}>

                <Card className="w-full max-w-full mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-64 ">

                        <Typography variant="h6" className="md:w-full mb-32">CUSTOMER NOTIFICATION MAILER</Typography>

                        <form name="registerForm" noValidate className="flex flex-col justify-center w-full">
                            <Typography variant="subtitle2">Select Types</Typography>
                            <FormGroup row>
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="type"
                                                checked={type.email}
                                                onChange={(ev) => this.handleCheck(ev, 'email')}/>
                                        }
                                        label="Email"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="type"
                                                checked={type.sms}
                                                onChange={(ev) => this.handleCheck(ev, 'sms')}/>
                                        }
                                        label="SMS"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="type"
                                                checked={type.push}
                                                onChange={(ev) => this.handleCheck(ev, 'push')}/>
                                        }
                                        label="Push Notification"
                                    />
                                </FormControl>
                            </FormGroup>
                            
                            { form.recipients.length !== 1 &&
                            <div>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Select Group</FormLabel>
                                    <RadioGroup aria-label="group" name="group" value={group} onChange={(ev) => this.handleCheck(ev, 'group')} row>
                            
                                        <FormControlLabel
                                            value=""
                                            control={
                                                <Radio />
                                            }
                                            label="None"
                                        />
                                        <FormControlLabel
                                            value="low"
                                            control={
                                                <Radio
                                                    onClick={() => this.props.getUserByGroup(0)}
                                                />
                                            }
                                            label="Low risk"
                                        />
                                    
                                        <FormControlLabel
                                            value="high"
                                            control={
                                                <Radio
                                                    onClick={() => this.props.getUserByGroup(1)}
                                                />
                                            }
                                            label="High risk"
                                        />
                                        
                                        <FormControlLabel
                                            value="all"
                                            control={
                                                <Radio
                                                    onClick={this.props.getAllGroup}
                                                />
                                            }
                                            label="All group"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            }



                            {!group && 
                                <FormGroup className="mb-32 mt-16 sm:mb-32">
                                    <FormControl>
                                        <FormLabel>Find & select customers</FormLabel>
                                        <MultiChipSelect
                                            onInputValueChange={this.handleChangeInput}
                                            inputValue={this.state.inputValue}
                                            availableItems={customers}
                                            selectedItem={selectedItem}
                                            onChange={this.handleXhange}
                                            onRemoveItem={this.removeSelectedItem}
                                        />
                                    </FormControl>
                                </FormGroup>
                            }


                            {/* {!(group.low || group.high) && 
                                <CustomerSelect handleChange={this.handleSelected} />
                            } */}

                            <TextField
                                className="mb-16"
                                label="Subject"
                                autoFocus
                                type="name"
                                name="subject"
                                value={form.subject}
                                onChange={this.handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            {/* <TextField
                                className="mb-16"
                                label="Message"
                                name="body"
                                multiline
                                rows="4"
                                value={form.body}
                                onChange={this.handleChange}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                            /> */}

                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={this.onEditorStateChange}
                            />

                            <Button variant="contained" color="primary" className="w-full mx-auto mt-16" aria-label="Register"
                                    disabled={!(this.canBeSubmitted() && (r && r.canedit || user.role && user.role.id === 1))}
                                    onClick={this.handleSubmit}
                                    >
                                SEND
                            </Button>

                        </form>

                        <div className="flex flex-col items-center justify-center pt-32 pb-24">
                            <span className="font-medium">Sends mail to user or group</span>
                        </div>

                    </CardContent>
                </Card>
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCustomers: Actions.getCustomers,
        saveEmail: Actions.saveEmail,
        saveSMS: Actions.saveSMS,
        savePushNotification: Actions.savePushNotification,
        sendPushNotification: Actions.sendPushNotification,
        getUserByGroup: Actions.getUserByGroup,
        getAllGroup: Actions.getAllGroup,
    }, dispatch);
}

function mapStateToProps({ UserNotificationApp, auth }) {
    console.log(UserNotificationApp, "Notification App")
    const { customers } = UserNotificationApp
    return { 
        user: auth.user.data,
        rights: auth.rights.right.rights,
        customers: customers.data,
        selectedCustomers: customers.selectedCustomers,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(NotificationForm)));
