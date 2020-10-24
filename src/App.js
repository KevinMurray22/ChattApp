import React from 'react';
import './App.css';
import io from "socket.io-client";
import Tabs from './components/Tabs'
const socket = io('10.0.0.200:3001');
socket.on('connect', function(tradeMsg) {
 console.log("Connection established");
},{'force new connection': true,
  timeout: 300000
  });


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name : "test"
    }

    this.setName = this.setName.bind(this);
    this.handleNameChangeSubmit = this.handleNameChangeSubmit.bind(this);
  }

  componentDidMount(){

    socket.emit('new user', sentName => {
      this.setName(sentName);
    });
    
  }
  
  setName(sentName) {
    this.setState({name: sentName}, () => {
    });
  }

  render(){
    return (
      <div className='tabs'>
        <Tabs 
        name = {this.state.name}
        nameChangeHandle = {this.handleNameChangeSubmit}
        socket={socket}
        />
      </div>
    )
  }

  handleNameChangeSubmit(e){
    e.preventDefault();
    let namePrompt = prompt('Change name to: ', this.state.name)
    if(namePrompt){
      socket.emit('change name', namePrompt, nameExists => {
        if(!nameExists){
          alert("Name already in use.");
        } else {
          this.setState({name : namePrompt});
        }
      });
    }
  }

}


export default App;

