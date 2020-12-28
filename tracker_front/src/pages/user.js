import { Button, Checkbox, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, IconButton  } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete"
import { DataGrid } from '@material-ui/data-grid';
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';  
import { PureComponent } from "react";
import './common.css';
import axios from 'axios' 
import moment from "moment";

class User extends PureComponent {


    constructor(props) {
        super(props)
        this.state= {
            description: '',
            project: 0,
            isBillable: false,
            clockedTime: 0,
            userId: null,
            istracking: false,
            startTime : null,
            endTime: null,
            tasks: [],
            projects: [],
            errors: {
                description: '',
                project: ''
            },
            user_id: 4
        }
        // this.columns = [
        //     { field: 'description', headerName: 'Description', width: 300 },
        //     { field: 'Project.project_name', headerName: 'Project', width: 300 },
        //     { field: 'start_datetime', headerName: 'Start Time', width: 300 },
        //     { field: 'end_datetime', headerName: 'End Time', width: 300 },
        //     {
        //       field: 'is_billable',
        //       headerName: 'Billable',
        //       width: 90,
        //     },
        //     {
        //       field: 'clocked_time',
        //       headerName: 'Clocked Time',
        //       width: 100
        //     }
        //   ];
          
    }

    async componentDidMount() {
        var projectList= await this.GetProjectList()
        var taskList= await this.GetTaskList()
        this.setState({
            tasks: taskList.data,
            projects: projectList.data
        })
        
        let startTime= localStorage.getItem('startTime')
        let currentTime= new Date().getTime();
        let clocked_time = Math.floor((currentTime - Number(startTime))/1000)
        
        if(startTime){
            let d = new Date()
            d.setTime(Number(startTime))
            this.setState({
                startTime: d,
                clockedTime: clocked_time,
                istracking: true
            })
            setTimeout(() => {
                this.startTimer()
            }, 500);
            
        }
       
    }

    GetTaskList = ()=>{
        return axios.get(`http://localhost:3000/task?user_id=${this.state.user_id}`)
    }

    GetProjectList = ()=>{
        return axios.get('http://localhost:3000/project')
    }

    CreateTask = (payLoad)=>{
        return axios.post('http://localhost:3000/task',payLoad)
    }
    
    DeleteTask = (id) => {
        return axios.delete(`http://localhost:3000/task/${id}`)
    }

    formatTime = (timer) => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
      
        return `${getHours} : ${getMinutes} : ${getSeconds}`
      }
      

    handleChange = (event) => {
        const name = event.target.name;
        var value;
       
        if(name == "isBillable"){
            value = event.target.checked;
        }else{
            value = event.target.value;
        }
        let state= this.state
        let errors= this.state.errors
        state[name]= value
        if(name == "description" && value !== ''){
            errors[name]= ''
        }
        if(name == "project" && value !== 0){
            errors[name]= ''
        }
        state.errors= errors
        this.setState(state)
    }

    handleDelete = async (id) => {
        var result = await this.DeleteTask(id)
        console.log(result)
        if(result && result.status === 200){
            let taskList= await this.GetTaskList()
            this.setState({
                tasks: taskList.data
            })
        }
    }

    startTimer () {
        this.intervalID= setInterval(() => {
            let timer = this.state.clockedTime + 1 ;
            this.setState({
                clockedTime: timer
            })
        }, 1000);
    }

    handleSubmit= async () => {
        if(!this.state.istracking){
            let currentTime = new Date();
            localStorage.setItem("startTime", currentTime.getTime())
            this.setState({
                istracking: true,
                startTime: currentTime
            })
          this.startTimer()
          setTimeout(() => {
        }, 500);
        }else{
            let description_error = '';
            let project_error = '';

            description_error= this.state.description == '' ? 'Add description' : ''
            project_error= this.state.project == 0 ? 'Select Project' : ''

            this.setState({
                errors: {
                    description: description_error,
                    project: project_error
                }
            })

            if(this.state.description == '' || this.state.project == 0){
                return false;
            }
            clearInterval(this.intervalID)
            let currentTime = new Date();
            this.setState({
                istracking: false,
                endTime: currentTime
            })
            localStorage.clear()
            setTimeout( async () => {
                let payLoad= {
                    "description": this.state.description,
                    "project_id": this.state.project,
                    "start_datetime": this.state.startTime,
                    "end_datetime": this.state.endTime,
                    "clocked_time": this.state.clockedTime,
                    "is_billable": this.state.isBillable,
                    "user_id": this.state.user_id
                }
               let result = await this.CreateTask(payLoad);
               if(result.status && result.status == 201){
                let taskList= await this.GetTaskList()
                this.setState({
                    tasks: taskList.data,
                    clockedTime: 0,
                    project: 0,
                    description: ''
                })
               }
            }, 500);
        }
    }

    render() {
     let description= this.state.description
     let project= this.state.project
     let isBillable= this.state.isBillable
     let clockedTime= this.state.clockedTime
        return (
            <div className="main-wrapper">
                <Container>
                <div className="head-wrapper">
                    <div className="field-wrapper">
                        <TextField label="Description" name="description" onChange={(e) => this.handleChange(e)} style={{ marginRight: '1rem' }} />
                        {this.state.errors.description != '' && (
                        <span className="error">
                            {this.state.errors.description}
                        </span>)}
                    </div>
                    
                    <FormControl className="select-wrapper">
                        <InputLabel id="demo-simple-select-label">Project</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" name="project" onChange={(e) => this.handleChange(e)}>
                        {
                            this.state.projects.map((project, index) => {
                                return <MenuItem key={index} value={project.id}>{project.project_name}</MenuItem>
                            })
                        }
                        </Select>
                        {this.state.errors.project != '' && (
                        <span className="error">
                            {this.state.errors.project}
                        </span>)}
                    </FormControl>
                    <FormControlLabel
                        control={
                        <Checkbox
                            // checked={isBillable}
                            onChange={(e) => this.handleChange(e)}
                            name="isBillable"
                            color="primary"
                        />
                        }
                        label="Billable"
                    />
                    <p>{this.formatTime(clockedTime)}</p>
                    <Button color="primary" onClick={ () => this.handleSubmit()}>{this.state.istracking ? 'Stop' : 'Start'}</Button>
                </div>
                </Container>
            
            {/* <div style={{ height: 800, width: '80%', top: '200px' }}>
                <DataGrid rows={rows} columns={this.columns} pageSize={20} checkboxSelection />
            </div> */}
            
                <TableContainer className="table-container" component={Paper}>  
                    <Table stickyHeader  aria-label="sticky table">  
                        <TableHead>
                            <TableRow>  
                            <TableCell align="left">Description</TableCell>  
                            <TableCell align="left">Project</TableCell>  
                            <TableCell align="left">Start Time</TableCell>  
                            <TableCell align="left">End Time</TableCell>  
                            <TableCell align="left">Clocked Time</TableCell>  
                            <TableCell align="left">Billable</TableCell>  
                            <TableCell align="left" ></TableCell>  
                            </TableRow>  
                        </TableHead>
                        <TableBody>  
                            {  
                            this.state.tasks.map((task, index) => {  
                                return <TableRow key={index}>  
                                            <TableCell component="th" scope="row">{task.description}</TableCell>  
                                            <TableCell align="left">{task.Project ? task.Project.project_name : ''}{(task.Project && task.Project.Client) ? ' - '+task.Project.Client.client_name : ''}</TableCell>  
                                            <TableCell align="left">{moment(task.start_datetime).format('lll')}</TableCell>  
                                            <TableCell align="left">{moment(task.end_datetime).format('lll')}</TableCell>  
                                            <TableCell align="left">{this.formatTime(task.clocked_time)}</TableCell>
                                            <TableCell align="left">{task.is_billable ? 'Y' : 'N'}</TableCell>  
                                            <TableCell align="left"><IconButton aria-label="delete" onClick={ () => this.handleDelete(task.id) }><DeleteIcon /></IconButton></TableCell>  
                                        </TableRow>  
                            })  
                            }  
                        </TableBody>  
                    </Table>  
                </TableContainer> 

            </div>
            
        )
    }
}

export default User