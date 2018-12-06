import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
// import Message from './components/Message'
import MessageList from './components/MessageList'

class App extends Component {
  state = {

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
        <Toolbar />
        {this.state.messages ? <MessageList messages={this.state.messages}/> : console.log('ayye')}
      </div>
    )
  }
}

export default App;
