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
    const { week } = props
    this.days = [
      {
        name: 'sunday',
        code: 'sun',
        date: week[0]
      },
      {
        name: 'monday',
        code: 'mon',
        date: week[1]
      },
      {
        name: 'tuesday',
        code: 'tue',
        date: week[2]
      },
      {
        name: 'wednesday',
        code: 'wed',
        date: week[3]
      },
      {
        name: 'thursday',
        code: 'thur',
        date: week[4]
      },
      {
        name: 'friday',
        code: 'fri',
        date: week[5]
      },
      {
        name: 'saturday',
        code: 'sat',
        date: week[6]
      }
    ]

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
        ...{[day.date]: times}
      }
    })
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
            key={day.code}
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
