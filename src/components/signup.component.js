import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import axios from 'axios'
import param from '../config/param'
import * as EmailValidator from 'email-validator';


export default class SignupComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            username:null,
            password:null,
            email:null,
            first_name:null,
            middle_name:null,
            last_name:null,
            address:null,
            phone:null,
            occupation:null,
            redirect:false
        }
    }

    onUserNameChangeHandler=e=>{
        this.setState({
            username:e.target.value
        })
    }

    onPassWordChange = e=>{
        this.setState({
            password:e.target.value
        })
    }

    onEmailChangeHandler=(e)=>{
        this.setState({
            email:e.target.value
        })
    }

    onFirstNameChangeHandler=e=>{
        this.setState({
            first_name:e.target.value
        })
    }

    onMiddleNameChangeHandler=e=>{
        this.setState({
            middle_name:e.target.value
        })
    }

    onLastNameChangeHandler=e=>{
        this.setState({
            last_name:e.target.value
        })
    }

    onAddressChangeHandler=e=>{
        this.setState({
            address:e.target.value
        })
    }

    onPhoneChangeHandler=e=>{
        this.setState({
            phone:e.target.value
        })
    }

    onOccupationChangeHandler=e=>{
        this.setState({
            occupation:e.target.value
        })
    }

    onSignupHandler=()=>{
        if (!this.state.username){
            window.alert("username cannot be none")
            return;
        }
        if (!this.state.password){
            window.alert("password cannot be none")
            return;
        }
        if (!this.state.email){
            window.alert("email address cannot be none")
            return;
        }
        if (!EmailValidator.validate(this.state.email)){
            window.alert("Invalid email address")
            return;
        }
        axios.post(param.URL+'signup', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            first_name:this.state.first_name,
            middle_name:this.state.middle_name,
            last_name:this.state.last_name,
            phone:this.state.phone,
            address:this.state.address,
            occupation:this.state.occupation
        }, {}).then(res=>{
            if (res.status===200){
                window.alert("signup success")
                this.props.history.push("/login");
            }
        }).catch(err=>{
            window.alert(err.response.data.msg)
        })
    }

    render() {

        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField fullWidth required id="filled-required" variant="filled" label="Username"
                                   name={'username'} onChange={(e) => this.onUserNameChangeHandler(e)}/>
                        <FormHelperText>Required</FormHelperText>

                    </Grid>
                    <Grid item xs={4}>

                        <TextField
                            fullWidth
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="filled"
                            onChange={(e)=>this.onPassWordChange(e)}
                        />
                        <FormHelperText>Required</FormHelperText>

                    </Grid>

                    <Grid item xs={4}>
                        <TextField fullWidth required id="filled-required" variant="filled" label="Email"
                                   name={'email'} onChange={(e) => this.onEmailChangeHandler(e)}/>
                        <FormHelperText>Required</FormHelperText>

                    </Grid>

                    <Grid item xs={4}>
                        <TextField fullWidth id="filled-basic" variant="filled" label="First Name"
                                   name={'first_name'} onChange={(e) => this.onFirstNameChangeHandler(e)}/>

                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth id="filled-basic" variant="filled" label="Middle Name"
                                   name={'middle_name'} onChange={(e) => this.onMiddleNameChangeHandler(e)}/>

                    </Grid>

                    <Grid item xs={4}>
                        <TextField fullWidth id="filled-basic" variant="filled" label="Last Name"
                                   name={'last_name'} onChange={(e) => this.onLastNameChangeHandler(e)}/>

                    </Grid>

                    <Grid item xs={4}>
                        <TextField fullWidth id="filled-basic" variant="filled" label="Address"
                                   name={'address'} onChange={(e) => this.onAddressChangeHandler(e)}/>

                    </Grid>

                    <Grid item xs={4}>
                        <TextField fullWidth id="filled-basic" variant="filled" label="Phone"
                                   name={'phone'} onChange={(e) => this.onPhoneChangeHandler(e)}/>

                    </Grid>

                    <Grid item xs={4}>
                        <TextField fullWidth id="filled-basic" variant="filled" label="Occupation"
                                   name={'occupation'} onChange={(e) => this.onOccupationChangeHandler(e)}/>

                    </Grid>


                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Button variant="contained" color="secondary" onClick={(e) => this.onSignupHandler(e)}>
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>


            </div>
        );
    }
}
