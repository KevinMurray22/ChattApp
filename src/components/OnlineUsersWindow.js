import React from 'react';

class OnlineUsersWindow extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        userList: [],
      }
    }
  
    componentDidMount(){
      this.props.socket.on('user list', list => {
        this.setState({userList: list});
        //alert(list);
      });
    }
  
  
    render() {
      return (
        <div className="user-window">
        <ul id="userWindow"><li><strong>Online Users</strong></li>{
          this.state.userList.map(user => {
            return <li name={user} onClick={this.props.onCreatePrivateMessage}key={user}>{user}</li>
          })
        }</ul>
        </div>
      );
    }
  }

  export default OnlineUsersWindow;