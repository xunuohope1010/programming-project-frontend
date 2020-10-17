import React from "react";
import Button from "@material-ui/core/Button";
import axios from 'axios'
import param from '../config/param'
import authHeader from "../services/auth-header";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class ClassificationComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false
        }
    }

    componentDidMount() {
        setInterval(()=>{
            if (localStorage.getItem('cookie')==null){
                this.props.history.push("/login")
                window.location.reload()
            }

        }, 1000)
    }

    onFileChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        })
    }

    onFileUploadHandler = () => {
        if (!this.state.selectedFile) {
            window.alert("file not selected!");
            return;
        }
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        this.setState({loading:true, response:null})
        axios.post(param.URL + '/upload', data, {headers:authHeader()}).then(res => {
            if (res.status === 200) {
                this.setState({loading:false})
                this.setState({
                    response: res.data.msg
                })
                this.forceUpdate()
            }
        }).catch(err=>{
            window.alert(err.response.data.msg);
        })
    }

    render() {

        const showResult = ()=>{
            if (this.state.response){
                return (
                    <Typography variant="h3" gutterBottom>
                        {this.state.response}
                    </Typography>
                )
            }
        }
        const showLoading = ()=>{
            if (this.state.loading){
                return (
                    <CircularProgress />
                )
            }
        }


        return (
            <div>
                <h3>You need to choose a file to do text classification</h3>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <input type={'file'} onChange={(e) => this.onFileChangeHandler(e)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="secondary" onClick={()=>this.onFileUploadHandler()}>
                            Upload
                        </Button>
                    </Grid>
                    <Grid>
                        {showLoading()}
                        {showResult()}
                    </Grid>
                </Grid>



            </div>

        );
    }
}
