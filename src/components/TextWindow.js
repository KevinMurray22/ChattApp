import React from 'react';

class TextWindow extends React.Component {
    constructor(props){
      super(props);
      // this.awaitMessages = this.awaitMessages.bind(this);
      // this.recieveMessage = this.recieveMessage.bind(this);
      this.state = {
       // messageList: [],
      }
      //this.awaitMessages();
    }
  
    // componentDidMount(){
    //   this.awaitMessages();
    // }
    // awaitMessages(){
    //   this.props.socket.on("chat message", this.recieveMessage);
    // }
  
    // recieveMessage(msg){
    //   this.setState({messageList: this.state.messageList.concat(msg)});
    // }
  
    render() {
      return (
        <div className="text-window">
        <ul id="messages">{
          this.props.messageList.map(message => {
            return <li key={message}>{message}</li>
          })
        }</ul>
        </div>
      );
    }
  }

  export default TextWindow;