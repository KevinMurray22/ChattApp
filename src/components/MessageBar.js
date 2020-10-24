import React from 'react';

class MessageBar extends React.Component {
    constructor(props){
      super(props);
      this.sendMessage = this.sendMessage.bind(this);
      this.handleOnChange = this.handleOnChange.bind(this);
      this.determineTypingUsers = this.determineTypingUsers.bind(this);
      this.state = {
        message: "",
        typingUserList: [],
      };
    }
  
    componentDidMount(){
      this.props.socket.on('typing', list => {
        this.setState({typingUserList: list});
      });
    }
  
    sendMessage(event){
      event.preventDefault();
      if(this.props.recipient==='Main Chat')
      {
        this.props.socket.emit("chat message", this.props.name + ": " + 
          this.state.message);
        this.props.socket.emit('not typing');
        this.setState({message : ''});
      } else {
        this.props.socket.emit("private message", this.props.recipient, this.props.name + ": " + 
          this.state.message);
        this.props.socket.emit('not typing');
        this.setState({message : ''});
      }
    }
  
    handleOnChange(event) {
      this.setState({message : event.target.value});
      if(event.target.value === ''){
        this.props.socket.emit('not typing');
  
      } else {
        this.props.socket.emit('typing');
      }
    }
  
    determineTypingUsers(){
      if(this.state.typingUserList.length > 0){
        return this.state.typingUserList.map(element => {return element } ) + ' is typing...';
      } else {
        return '';
      }
    }
    
    render() {
      return (
        <form className="message-form" action="" onSubmit={this.sendMessage}>
          <div className="user-type">{this.determineTypingUsers()}</div>
        <input ref={this.props.messageInput}value={this.state.message} onChange={this.handleOnChange} id="m" autoComplete="off" /><button>Send</button>
      </form>
      );
    }
  }

  export default MessageBar;