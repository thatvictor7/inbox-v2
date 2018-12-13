import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
// import Message from './components/Message'
import MessageList from './components/MessageList'

class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        allSelected: false,
        unreadCount: 0
      }
      this.starToggle = this.starToggle.bind(this);
      this.selectToggle = this.selectToggle.bind(this);
      this.selectToggleAll = this.selectToggleAll.bind(this);
      this.markRead = this.markRead.bind(this);
      this.markUnread = this.markUnread.bind(this);
      this.readUnreadButton = this.readUnreadButton.bind(this);
      this.readCounter = this.readCounter.bind(this);
    }

  starToggle(messageId) {
     fetch('http://localhost:8082/api/messages', {
         method: "PATCH",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           messageIds: [messageId],
           command: 'star',
           "starred": true
         })
       }).then(res => res.json())
       .then(data => {
         this.setState({
           messages: data
         })
       })
  }

     selectToggleAll() {
       let arr = [...Array(this.state.messages.length+1).keys()].splice(1, this.state.messages.length+1)
      //  console.log(arr)
       fetch('http://localhost:8082/api/messages', {
           method: "PATCH",
           headers: {
             "Content-Type": "application/json",
             "Accept": "application/json"
           },
           body: JSON.stringify({
             messageIds: arr,
             command: 'select',
             "selected": true
           })
         }).then(res => res.json())
         .then(data => {
           this.setState({
             messages: data
           })
           this.setState({ allSelected: true})
         })
     }

    selectToggle = async(id) => {
      await fetch('http://localhost:8082/api/messages', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          messageIds: [id],
          command: "select",
          "selected": true
        })
      })
      const updatedMessages = this.state.messages.map(message => {
        if (message.id === id) {
          message.selected = !message.selected
        }
        return message
      })
      this.setState({ messages: updatedMessages})
    }

    markRead = async (id) => {
      await fetch('http://localhost:8082/api/messages', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          messageIds: [id],
          command: "read",
          "read": true
        })
      })
      const updatedMessages = this.state.messages.map(message => {
        if (message.id === id) {
          message.read = !message.read
        }
        return message
      })
      this.setState({ messages: updatedMessages})
      this.readCounter()
    }

    markUnread = async (id) => {
      await fetch('http://localhost:8082/api/messages', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          messageIds: [id],
          command: "read",
          "read": false
        })
      })
      const updatedMessages = this.state.messages.map(message => {
        if (message.id === id) {
          message.read = !message.read
        }
        return message
      })
      this.setState({ messages: updatedMessages })

    }

    readUnreadButton(commandButton) {
      // console.log(this.state)
      if (commandButton === 'read') {
        this.state.messages.map(message => {
          message.selected ? this.markRead(message.id) : console.log('error')
        })
      } else {
        this.state.messages.map(message => {
          message.selected ? this.markUnread(message.id) : console.log('error')
        })
      }
    }

    readCounter = () => {
      // console.log(this.state.messages)
      let counter = 0
      if (this.state.messages) {
        this.state.messages.map(message => {
          if (!message.read) {
            counter++
            this.setState({ unreadCount: counter })
          }
        })
      }
      console.log(this.state)
    }

  async componentDidMount() {
    let res = await fetch('http://localhost:8082/api/messages')
    let jsonRes = await res.json()
    this.setState({
      messages: jsonRes
    })
    this.readCounter()
  }

  render() {
    return (
      <div>
        <Toolbar readUnreadButton={this.readUnreadButton}
                 unreadCount={this.state.unreadCount}
                 allSelected={this.allSelected}
                 selectToggleAll={this.selectToggleAll}/>
        {this.state.messages ? <MessageList starToggle={this.starToggle}
                                            markRead={this.markRead}
                                            selectToggle={this.selectToggle}
                                            messages={this.state.messages}/> : console.log('ayye')}                                         
      </div>
    )
  }
}

export default App;
