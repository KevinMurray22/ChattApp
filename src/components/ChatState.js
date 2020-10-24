

class ChatState {
    constructor(chatName, connection, messageList){
        //alert(chatName);
        this.chatName = chatName;
        this.connectTo = connection;
        messageList ? this.messageList = [messageList] : this.messageList = [];
    }
}

export default ChatState;