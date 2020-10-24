import React from 'react';
class GroupActivity extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        
      }
    }

    render() {
      return (
        <div className="user-window">
        <ul id="userWindow">
          <li><strong>Chat Rooms <button onClick={this.props.createNewChatRoom} className="newChatButton">+</button></strong></li>
  
        {
          this.props.groupStates.map((group, index) => {
            return <li 
              type='groupStates'
              index={index}
              onClick={this.props.onActivityClick}
              key={group.chatName}
              >
                {group.chatName}
            </li>
          })
        }</ul>
        </div>
      );
    }
  }

  export default GroupActivity;