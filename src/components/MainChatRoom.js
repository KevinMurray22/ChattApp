import React from 'react';
import BottomBar from './BottomBar';
import OnlineUsersWindow from './OnlineUsersWindow';
import TextWindow from './TextWindow';
import GroupActivity from './GroupActivity'


class MainChatRoom extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render(){
      let activityState = this.props[`${this.props.currentState}`][`${this.props.currentIndex}`];
      return (
        <div className="App">
  
          <div className='top-window'>
            <div className='side-window'>
              <GroupActivity
                socket={this.props.socket}
                groupStates={this.props.groupStates}
                onActivityClick={this.props.onActivityClick}
                createNewChatRoom={this.props.createNewChatRoom}
              />
              <OnlineUsersWindow 
                socket={this.props.socket}
                onCreatePrivateMessage={this.props.onCreatePrivateMessage}
              />
            </div>
            <TextWindow
              socket={this.props.socket}
              messageList={activityState.messageList}
            />
            </div>
            <BottomBar
              socket={this.props.socket}
              name={this.props.name}
              nameChangeHandle={this.props.nameChangeHandle}
              onCreatePrivateMessage={this.props.onCreatePrivateMessage}
              recipient={this.props.groupStates[this.props.currentIndex].chatName}
              messageInput={this.props.messageInput}
            />
        </div>
      );
    }
  }

  export default MainChatRoom;
  