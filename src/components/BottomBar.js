import React from 'react';
import SettingsBar from './SettingsBar'
import MessageBar from './MessageBar'


class BottomBar extends React.Component {

    constructor(props){
      super(props);
      this.state = {
     //   name: ''//this.props.name
      }
      //this.handleNameChangeSubmit = this.handleNameChangeSubmit.bind(this);
    }
  
    componentDidMount(){
      // this.props.socket.emit('new user', sentName => {
      //   this.setState({name: sentName});
      // });
      //this.setState({name: this.props.name});
    }
  
    render() {
      return (
        <div>
          <SettingsBar 
            nameChangeHandle={this.props.nameChangeHandle}
            onCreatePrivateMessage={this.props.onCreatePrivateMessage}
          />
          <MessageBar 
          socket = {this.props.socket}
          name = {this.props.name}
          recipient={this.props.recipient}
          messageInput={this.props.messageInput}
          />
        </div>
      );
    }
  
  //   handleNameChangeSubmit(e){
  //     e.preventDefault();
  //     let namePrompt = prompt('Change name to: ', this.props.name)
  //     if(namePrompt){
  //       this.props.socket.emit('change name', namePrompt, nameExists => {
  //         if(!nameExists){
  //           alert("Name already in use.");
  //         } else {
  //           this.setState({name : namePrompt});
  //         }
  //       });
  //     }
  //   }
  
   }

   export default BottomBar;