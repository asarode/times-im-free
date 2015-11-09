'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import R from 'ramda'
import moment from 'moment'
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

  static PropTypes = {
    week: PropTypes.array,
    slices: PropTypes.number,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    onSelection: PropTypes.func
  }

  static defaultProps = {
    week: fetchWeek.now(),
    slices: 4
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
    const { selected } = this.state
    const { onSelection } = this.props
    const updateTimes = { [day.date.valueOf()]: times }
    const newSelected = {
      ...selected,
      ...updateTimes
    }
    this.setState({
      selected: newSelected
    })
    onSelection(newSelected)
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
    const { onNext, onPrev } = this.props
    const slices = 4
    return (
      <div className='cal-TimePicker'>
        <Controls
          month={this.days[0].date}
          onNext={e => onNext(e)}
          onPrev={e => onPrev(e)}/>
        <div className='cal-TimePicker-tool'>
          <TimeColumn times={times}/>
          {days.map(day => (
            <DayColumn
              key={day.fmt}
              shouldDelete={shiftHeld}
              day={day}
              slices={slices}
              onSelection={times => this.onSelection(times, day)}/>
          ))}
        </div>
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

const Controls = ({ month, onNext, onPrev }) => {
  return (
    <div className='cal-Controls'>
      <button className='cal-Controls-button' onClick={onPrev}>← Prev</button>
      <div className='cal-Controls-month'>
        <h2 className='cal-Controls-month-text'>{month.format('MMMM').toUpperCase()}</h2>
      </div>
      <button className='cal-Controls-button' onClick={onNext}>Next →</button>
    </div>
  )
}
