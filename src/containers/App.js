'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreators'
import immutable from 'immutable'
import cx from 'classname'
import R from 'ramda'
import moment from 'moment'
import { fetchWeek } from '../utils'
import { TimePicker, TimeFormatter } from '../components'

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

  onSelection(selected) {
    this.setState({
      selected: selected
    })
  }

  render() {
    const { week, selected } = this.state
    const slices = 4
    return (
      <div>
        <Header/>
        <Content>
          <TimePicker
            week={week}
            slices={slices}
            onNext={this.onNext.bind(this)}
            onPrev={this.onPrev.bind(this)}
            onSelection={this.onSelection.bind(this)}/>
          <TimeFormatter
            selected={selected}
            slices={slices}/>
        </Content>
        <Footer/>

      </div>
    )
  }
}

const Header = () => (
  <div className='cal-Header'>
    <div className='cal-Header-title'>
      <h1 className='cal-Header-title-text'>Times I'm free</h1>
    </div>
    <div className='cal-Header-subtitle'>
      <h3 className='cal-Header-subtitle-text'>
        Select times you're free, get text to copy + paste anywhere
      </h3>
    </div>
  </div>
)

const Content = ({ children }) => (
  <div className='cal-Content'>
    {children}
  </div>
)

const Footer = () => (
  <div></div>
)
