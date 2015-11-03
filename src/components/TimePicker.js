'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import R from 'ramda'
import { fetchWeek } from '../utils'
import { DayColumn } from '.'

export default class TimePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: {},
      shiftHeld: false
    }

    this.times = [...this._pushTimes('am'), ...this._pushTimes('pm')]
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown.bind(this))
    window.addEventListener('keyup', this.onKeyUp.bind(this))
  }

  onKeyDown(e) {
    if (this.state.shiftHeld || !e.shiftKey) return
    this.setState({
      shiftHeld: true
    })
  }

  onKeyUp(e) {
    if (!this.state.shiftHeld || e.shiftKey) return
    this.setState({
      shiftHeld: false
    })
  }

  _pushTimes(suffix) {
    return [
      {
        suffix,
        time: 12
      },
      ...R.range(1, 12).map(time => ({
        time,
        suffix
      }))
    ]
  }

  onSelection(times, day) {
    this.setState({
      selected: {
        ...this.state.selected,
        ...{[day.fmt]: times}
      }
    })
  }

  get days() {
    return this.props.week.map(date => ({
      date,
      fmt: date.format('ddd M/D')
    }))
  }

  render() {
    const { days, times } = this
    const { shiftHeld } = this.state
    return (
      <div>
        <p>{JSON.stringify(this.state.selected)}</p>
        <TimeColumn times={times}/>
        {days.map(day => (
          <DayColumn
            key={day.fmt}
            shouldDelete={shiftHeld}
            day={day}
            onSelection={times => this.onSelection(times, day)}/>
        ))}
      </div>
    )
  }
}

const TimeString = ({ time, suffix }) => (
  <div className='cal-TimeString'>
    <span
      className='cal-TimeString-time cal-TimeString-text'>
      {String(time)}
    </span>
    <span
      className='cal-TimeString-suffix cal-TimeString-text'>
      {String(suffix.toUpperCase())}
    </span>
  </div>
)

const TimeColumn = ({ times }) => {
  const timeLabels = times.map(t => (
    <TimeString
      key={`${t.time} ${t.suffix}`}
      time={t.time}
      suffix={t.suffix}/>
  ))

  return (
    <div className='cal-TimeColumn'>
      <div className='cal-TimeColumn-title cal-column-title'>
        CDT
      </div>
      {timeLabels}
    </div>
  )
}
