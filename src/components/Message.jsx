import React, { Component } from 'react';

const Message = (props) => {
  const { subject, starred, selected, read, body, labels, starToggle, id, selectToggle,markRead } = props
  const messageRead = read ? "read " : "unread "
  const messageStarred = starred ? "fa-star " : "fa-star-o "
  const messageSelected = selected ? " selected " : " "
  const messageLabels = labels.map((label,i) => {
    return <span key={i} className={"label label-warning"}>{label}</span>
  })

  return (
    <div onClick={() => markRead(id)} className={"row message " + messageRead + messageSelected}>
  <div class="col-xs-1">
    <div class="row">
      <div class="col-xs-2">
            <input onClick={() => selectToggle(id)} type="checkbox" checked={(typeof selected!== "undefined") && selected === true ? "checked" : ""} />
      </div>
      <div class="col-xs-2">
            <i onClick={() => starToggle(id)} class={"star fa " + messageStarred}></i>
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
