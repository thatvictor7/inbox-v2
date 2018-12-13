import React, { Component } from 'react';

const Toolbar = (props) => {
  const { selectToggleAll, readUnreadButton, allSelected,unreadCount } = props
  const allSelectedButton = allSelected ? "fa-check-square-o" : "fa-minus-square-o"

  return (
    <div className="App">
    <div className="row toolbar">
  <div class="col-md-12">
    <p class="pull-right">
      <span class="badge badge">{unreadCount}</span>
      unread messages
    </p>

    <a class="btn btn-danger">
      <i class="fa fa-plus"></i>
    </a>

    <button class="btn btn-default">
      <i onClick={() => selectToggleAll()} class={"fa " + allSelectedButton}></i>
    </button>

    <button onClick={() => readUnreadButton('read')} class="btn btn-default">Mark As Read</button>

    <button onClick={() => readUnreadButton('unread')} class="btn btn-default">Mark As Unread</button>

    <select class="form-control label-select">
      <option>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select class="form-control label-select">
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button class="btn btn-default">
      <i class="fa fa-trash-o"></i>
    </button>
  </div>
</div>
</div>
  )
}

export default Toolbar
