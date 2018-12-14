import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
// import Message from './components/Message'
import MessageList from './components/MessageList'
import ComposeMessage from './components/ComposeMessage'

class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        allSelected: false,
        unreadCount: 0,
        composeClicked: false,
        subjectValue: ""
      }
      this.starToggle = this.starToggle.bind(this);
      this.selectToggle = this.selectToggle.bind(this);
      this.selectToggleAll = this.selectToggleAll.bind(this);
      this.markRead = this.markRead.bind(this);
      this.markUnread = this.markUnread.bind(this);
      this.readUnreadButton = this.readUnreadButton.bind(this);
      this.readCounter = this.readCounter.bind(this);
      this.composeClicked = this.composeClicked.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleBody = this.handleBody.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  composeClicked() {
    !this.state.composeClicked ? this.setState({composeClicked:true}) : this.setState({composeClicked:false})
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
      let counter = 0
      if (this.state.messages) {
        this.setState({ unreadCount: 0 })
        this.state.messages.map(message => {
          if (!message.read) {
            counter++
            this.setState({ unreadCount: counter })
          } 
        })
      }
    }

    handleSubmit(event) {
      this.postReq()
      event.preventDefault();
    }

    handleChange(event) {
      this.setState({
        subjectValue: event.target.value
      })
    }

    handleBody(event) {
        this.setState({
          bodytValue: event.target.value
        })
    }

  postReq = async() => {
    console.log(this.state)
    const url = 'http://localhost:8082/api/messages'
    const payload = {
      subject: this.state.subjectValue,
      body: this.state.bodytValue,
      read: false,
      starred: false,
      labels: [],
      selected: false
    }
    await fetch(url,{
      method: 'post',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(payload)
    }).then(function (response) {
      return response.json();
    })
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
                 composeClicked={this.composeClicked}
                 unreadCount={this.state.unreadCount}
                 allSelected={this.allSelected}
                 selectToggleAll={this.selectToggleAll}/>
        {this.state.composeClicked ? <ComposeMessage handleChange={this.handleChange}
                                                     handleBody={this.handleBody}
                                                     handleStateForm={this.handleStateForm}
                                                     handleSubmit={this.handleSubmit} /> : < div > </div>}
        {this.state.messages ? <MessageList starToggle={this.starToggle}
                                            markRead={this.markRead}
                                            selectToggle={this.selectToggle}
                                            messages={this.state.messages}/> : console.log('ayye')}                                         
      </div>
    )
  }
}

export default App;
