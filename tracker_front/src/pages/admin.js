import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select } from "@material-ui/core";
import axios from "axios";
import { PureComponent } from "react";
import moment from "moment"
import './common.css';

class Admin extends PureComponent {
    constructor(props){
        super(props)
        this.state= {
            user: 0,
            users:[],
            tasks: []
        }
    }
    
    async componentDidMount() {
        let userList = await this.GetUserList()
        let taskList = await this.GetTaskList('all')
        this.setState({
            tasks: taskList.data,
            users: userList.data
        })
    }

    GetTaskList= (id) => {
        var query;
        if(id !== "all"){
            query= "?user_id="+id
        }else{
            query= ''
        }
        return axios.get(`http://localhost:3000/task${query}`)
    }

    GetUserList= () => {
        return axios.get(`http://localhost:3000/users?user_type=E`)
    }

    formatTime = (timer) => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
      
        return `${getHours} : ${getMinutes} : ${getSeconds}`
      }

      handleChange= async (event) => {
        let taskList = await this.GetTaskList(event.target.value)
        this.setState({
            tasks: taskList.data
        })
      }

    render() {
     return (
         <div className="main-wrapper">
             <div className="select-formcontrol">
                <FormControl style={{ width: '200px' }}>
                    <InputLabel htmlFor="user">Select User</InputLabel>
                    <Select native onChange={this.handleChange} inputProps={{ name: 'user', id: 'user', }}
                    >
                    <option value='all' >All</option>
                    {
                        this.state.users.map((user, index) => {
                            return <option key={index} value={user.id}>{user.firstname} {user.lastname}</option>
                        })
                    }
                    </Select>
                </FormControl>
             </div>
             
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
                        {/* <TableCell align="left" ></TableCell>   */}
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
                                        {/* <TableCell align="left"><IconButton aria-label="delete" onClick={ () => this.handleDelete(task.id) }><DeleteIcon /></IconButton></TableCell>   */}
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

export default Admin