import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
// import Message from './components/Message'
import MessageList from './components/MessageList'

class App extends Component {
  // state = {

  // }
    constructor(props) {
      super(props)
      this.state = {
      }
      this.starToggle = this.starToggle.bind(this);
      this.selectToggle = this.selectToggle.bind(this);
      this.selectToggleAll = this.selectToggleAll.bind(this);
      this.markRead = this.markRead.bind(this);
    }

  starToggle(messageId) {
    // this.getRead()
    // console.log(this.state)
     fetch('http://localhost:8082/api/messages', {
         method: "PATCH",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           messageIds: [messageId],
           command: 'star'
         })
       }).then(res => res.json())
       .then(data => {
         this.setState({
           messages: data
         })
         console.log(this.state)
       })
  }

     selectToggleAll() {
       fetch('http://localhost:8082/api/messages', {
           method: "PATCH",
           headers: {
             "Content-Type": "application/json"
           },
           body: JSON.stringify({
             messageIds: [...Array(this.state.messages.length).keys()].shift(),
             command: 'select'
           })
         }).then(res => res.json())
         .then(data => {
           this.setState({
             messages: data
           })
           console.log(this.state)
         })
     }

    selectToggle(messageId) {
      console.log(this.state)
      fetch('http://localhost:8082/api/messages', {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            messageIds: [messageId],
            command: 'select'
          })
        }).then(res => res.json())
        .then(data => {
          this.setState({
            messages: data
          })
          // console.log(this.state)
        })
    }

    markRead(messageId) {
      // console.log(this.state)
      this.getRead()
      fetch('http://localhost:8082/api/messages', {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            messageIds: this.state.readMessagesList,
            command: 'read'
          })
        }).then(res => res.json())
        .then(data => {
          this.setState({
            messages: data
          })
          console.log(this.state.readMessagesList)
        })
    }

    getRead() {
      // console.log(this.state.messages)
      const readMessages = []
      this.state.messages.map((message,id) => {
        message.read ? readMessages.push(id) : console.log(id,'nah')
      })
      // console.log(readMessages)
      this.setState({ readMessagesList: readMessages})
      // console.log(this.state)
    }

  componentDidMount() {
    fetch('http://localhost:8082/api/messages')
    .then(res => res.json())
    .then(messages => {
      this.setState({ messages: messages })
    })
  }

  render() {
    return (
      <div>
        <Toolbar markRead={this.markRead}
                 selectToggleAll={this.selectToggleAll}/>
        {this.state.messages ? <MessageList starToggle={this.starToggle}
                                            selectToggle={this.selectToggle}
                                            messages={this.state.messages}/> : console.log('ayye')}                                         
      </div>
    )
  }
}

export default App;
