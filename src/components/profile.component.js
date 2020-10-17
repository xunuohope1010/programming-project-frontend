import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import axios from 'axios'
import param from '../config/param'
import authHeader from "../services/auth-header";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class ProfileComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            response:null,
            password:null,
        }
    }

    componentDidMount() {
        this.setState({response:JSON.parse(localStorage.getItem('cookie'))})
        setInterval(()=>{
            if (localStorage.getItem('cookie')==null){
                this.props.history.push("/login")
                window.location.reload()
            }

        }, 1000)
    }

    onPassWordChange = e=>{
        this.setState({
            password:e.target.value
        })
    }

    onPasswordUpdateHandler = e =>{
        if (!this.state.password){
            window.alert("password cannot be none")
            return
        }
        axios.post(param.URL+'update', {
            password:this.state.password
        },{headers:authHeader()}).then(res=>{
            if (res.status===200){
                window.alert("success")
            }
        }).catch(err=>{
            window.alert(err.response.data.msg)
        })
    }

    render() {
        // if (localStorage.getItem('cookie')!=null){
        //     console.log("test")
        //     this.props.history.push("/login");
        // }

        const showResult = ()=>{
            if (this.state.response){
                return (
                    <div>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">

                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            username
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response.username}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            email
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response.email}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            address
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response.address}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            phone
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response.phone}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            First name
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response.first_name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Middle name
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response.middle_name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Last name
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response.last_name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Occupation
                                        </TableCell>
                                        <TableCell>
                                            {this.state.response.occupation}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>

                            </Table>

                        </TableContainer>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
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

                            <Grid item xs={6}>
                                <Button variant="contained" color="secondary" onClick={(e) => this.onPasswordUpdateHandler(e)}>
                                    Update password
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                )
            }
        }


        return (
            <div>
                {showResult()}
            </div>
        );

    }
}
