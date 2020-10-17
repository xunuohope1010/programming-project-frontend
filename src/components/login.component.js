import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import axios from "axios";
import param from "../config/param";

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        }
    }

    onUserNameChangeHandler = e => {
        this.setState({
            username: e.target.value
        })
    }

    onPassWordChange = e => {
        this.setState({
            password: e.target.value
        })
    }
    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    onLoginHandler = () => {
        if (!this.state.username) {
            window.alert("username cannot be none")
            return;
        }
        if (!this.state.password) {
            window.alert("password cannot be none")
            return;
        }

        axios.post(param.URL + 'login', {
            username:this.state.username,
            password:this.state.password
        }, {}).then(res => {
            this.setState({response: res.data})
            localStorage.setItem("cookie", JSON.stringify(res.data));
            this.props.history.push('/profile')
            window.location.reload()
        }).catch(err => {
            window.alert(err.response.data.msg)
        })

    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField fullWidth required id="filled-required" variant="filled" label="username"
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
                            onChange={(e) => this.onPassWordChange(e)}
                        />
                        <FormHelperText>Required</FormHelperText>

                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="secondary" onClick={() => this.onLoginHandler()}>
                            Login
                        </Button>
                    </Grid>
                </Grid>

            </div>
        );
    }
}
