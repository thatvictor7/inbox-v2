import React, { Component } from 'react';
import Message from './Message'


const MessageList = (props) => {
  const { messages,starToggle,selectToggle,markRead } = props

  return(
    <div>
    {messages.map(message => {
      return <Message starred={message.starred}
                      starToggle={starToggle}
                      markRead={markRead}
                      selectToggle={selectToggle}
                      id={message.id}
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
