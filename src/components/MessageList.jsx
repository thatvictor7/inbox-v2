import React, { Component } from 'react';
import Message from './Message'


const MessageList = (props) => {
  const { messages } = props

  return(
    <div>
    {messages.map(message => {
      return <Message starred={message.starred}
                      labels={message.labels}
                      selected={message.selected}
                      body={message.body}
                      read={message.read}
                      subject={message.subject}/>
    })}
    </div>
  )
}

export default MessageList
