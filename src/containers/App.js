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
    this.state = {
      week: fetchWeek.now()
    }
  }

  onNext(e) {
    this.setState({
      week: fetchWeek.next(this.state.week)
    })
  }

  onPrev(e) {
    this.setState({
      week: fetchWeek.prev(this.state.week)
    })
  }

  render() {
    const { week } = this.state
    return (
      <div>
        <Controls
          onNext={e => this.onNext(e)}
          onPrev={e => this.onPrev(e)}/>
        <TimePicker week={week}/>
      </div>
    )
  }
}

const Controls = ({ onNext, onPrev }) => {
  return (
    <div>
      <button onClick={onPrev}>← Prev</button>
      <button onClick={onNext}>Next →</button>
    </div>
  )
}
