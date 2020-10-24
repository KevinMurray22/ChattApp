import React from 'react';

class SettingsBar extends React.Component {

    render(){
      return (
        <form  className="settingsForm" id="settings" action="">
            <button onClick={this.props.nameChangeHandle}>Change name</button>
        </form>
      );
    }
  
  }

  export default SettingsBar;