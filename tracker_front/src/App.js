// import logo from './logo.svg';
import './App.css';
import Routes from './routes/';
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"

function App() {
  
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Button color="inherit" href="/">Admin</Button>
          <Button color="inherit" href="/user">User</Button>
        </Toolbar>
      </AppBar>
      <Routes/>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
