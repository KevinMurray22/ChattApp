import React from 'react';
import MainChatRoom from './MainChatRoom'
import ChatState from './ChatState';

 class Tabs extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        currentState: 'groupStates',
        currentIndex: 0,
        tabs: [],
        groupStates: [new ChatState('Main Chat', this.props.socket)]

        
      };
      
      this.messageInput = React.createRef();
      this.awaitMessages = this.awaitMessages.bind(this);
      this.recieveMessage = this.recieveMessage.bind(this);
      this.recievePrivateMessage = this.recievePrivateMessage.bind(this);
      this.onActivityClick = this.onActivityClick.bind(this);
      this.onCreatePrivateMessage = this.onCreatePrivateMessage.bind(this)
      this.updateChatrooms = this.updateChatrooms.bind(this);
      this.createNewChatRoom = this.createNewChatRoom.bind(this);
      this.updateChatroomList = this.updateChatroomList.bind(this);
    }
  

  componentDidMount(){
    this.awaitMessages();
  }

  componentDidUpdate(){
    this.messageInput.current.focus();
  }

  awaitMessages(){
    this.props.socket.on("chat message", this.recieveMessage);
    this.props.socket.on("private message", this.recievePrivateMessage);
    this.props.socket.on('update chatrooms', this.updateChatrooms);
    this.props.socket.on('update chatroom list', this.updateChatroomList)
  }

  recieveMessage(msg){
    let tempGroupState = [...this.state.groupStates];
    if(tempGroupState[0].messageList === 'undefined') {
      tempGroupState[0].messageList = msg;
    } else {
      tempGroupState[0].messageList = tempGroupState[0].messageList.concat(msg);
    }
    this.setState({groupStates: tempGroupState});
  }

  updateChatrooms(oldName, newName) {
    let chatRooms = [...this.state.groupStates];
    for(let x = 0; x < chatRooms.length; x++) {
      if(chatRooms[x].chatName === oldName) {
        chatRooms[x].chatName = newName;
        break;
      } 
    }
    this.setState({groupStates: chatRooms});
  }

  updateChatroomList(item) {
    let chatRooms = [...this.state.groupStates];
    chatRooms = chatRooms.concat(new ChatState(item, this.props.socket));
    this.setState({groupStates: chatRooms});
    this.props.socket.emit('join chatroom', item);
  }

  createNewChatRoom() {
    if(window.confirm('Create new Chat Room?')) {
      let chatRoomName = prompt('What would you like to call the room?');
      this.props.socket.emit('new chatroom request', chatRoomName);
    }
  }

  recievePrivateMessage(msg, sender) {
    let tempGroupState = [...this.state.groupStates];
    let flag = false;
    
    for(let x =0; x < tempGroupState.length; x++) {
      if(tempGroupState[x].chatName === sender) {
        tempGroupState[x].messageList = tempGroupState[x].messageList.concat(msg);
        flag=true;
        break;
      } 
    }
      if(!flag){
      tempGroupState = tempGroupState.concat((new ChatState(sender, this.props.socket, msg)));
      }
      this.setState({groupStates: tempGroupState});

    
  }

  onCreatePrivateMessage(e){
    e.preventDefault();
    let name = e.target.getAttribute('name');
    let room = window.confirm(`Create private chatroom with ${name}?`);

    if(room) {
      let tempGroupState = [...this.state.groupStates];
      tempGroupState = tempGroupState.concat(new ChatState(e.target.getAttribute('name'), this.props.socket));
      this.setState( { groupStates: tempGroupState}, () => {
        this.setState({currentIndex: this.state.groupStates.length - 1})
      });
    }
  }

  onActivityClick(e) {
    let activityType = e.target.getAttribute('type');
    let activityIndex = e.target.getAttribute('index');
    this.setState({currentState: activityType,
      currentIndex: activityIndex
    });
  }

  render() {
    return (
      <MainChatRoom
      socket={this.props.socket} 
      nameChangeHandle={this.props.nameChangeHandle} 
      name={this.props.name}
      groupStates={this.state.groupStates}
      currentState={this.state.currentState}
      currentIndex={this.state.currentIndex}
      onActivityClick={this.onActivityClick} 
      onCreatePrivateMessage={this.onCreatePrivateMessage}
      messageInput={this.messageInput}
      createNewChatRoom={this.createNewChatRoom}
      />
    );
  }
}

  export default Tabs;