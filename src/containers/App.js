'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreators'
import immutable from 'immutable'
import cx from 'classname'
import { fetchWeek } from '../utils'
import { TimePicker } from '../components'

@connect()
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <TimePicker week={fetchWeek.now()}/>
      </div>
    )
  }
}
