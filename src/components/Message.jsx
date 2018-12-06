import React, { Component } from 'react';

const Message = (props) => {
  const { subject,starred,selected,read,body,labels } = props
  const messageRead = read ? "read" : "unread"
  const messageStarred = starred ? "fa-star" : "fa-star-o"
  const messageLabels = labels.map((label,i) => {
    return <span key={i} className={"label label-warning"}>{label}</span>
  })

  return (
    <div class={"row message " + messageRead}>
  <div class="col-xs-1">
    <div class="row">
      <div class="col-xs-2">
        <input type="checkbox" />
      </div>
      <div class="col-xs-2">
        <i class={"star fa " + messageStarred}></i>
      </div>
    </div>
  </div>
  <div class="col-xs-11">
    {messageLabels}
    <a href="#">
      {subject}
    </a>
  </div>
</div>
  )
}
export default Message
