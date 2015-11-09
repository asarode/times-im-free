'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import R from 'ramda'
import moment from 'moment'
import { processor } from '../utils'

export default class TextFormatter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      format: Format.YO_COLONS
    }
  }

  static PropTypes = {
    selected: PropTypes.object,
    slices: PropTypes.number
  }

  onSwitchFormat(formatKey) {
    this.setState({
      format: Format[formatKey]
    })
  }

  render() {
    const { format } = this.state
    const { selected, slices } = this.props
    return (
      <div>
        <FormatPicker
          format={format}
          onSwitch={this.onSwitchFormat}/>
        <TimeText
          fmt={format}
          selected={selected}
          slices={slices}/>
      </div>
    )
  }
}

const FormatPicker = ({ format, onSwitch }) => (
  <span>Format: Yo, Colon</span>
)

const TimeText = ({ selected, slices, fmt }) => {
  const dayRanges = processor.getRanges(selected, slices)
  return (
    <div className='cal-TimeText'>
      <ul>
        {dayRanges.map((day, i) => (<DayString key={i} day={day} fmt={fmt}/>))}
      </ul>
    </div>
  )
}

const DayString = ({ day, fmt }) => {
  const time = (hours) => {
    return R.clone(day.moment)
      .hours(hours % 24)
      .minutes((hours - Math.floor(hours)) * 60)
      .format(fmt.time)
  }
  return (
    <li>
      <div>{day.moment.format(fmt.date)}</div>
      {day.ranges.map((range, i) => (
        <p key={i}>
          {time(range.start)}
          -
          {time(range.end)}</p>
      ))}
    </li>
  )
}

const Format = {
  YO_COLONS: {
    name: 'Yo, Colons',
    date: 'ddd M/D',
    time: 'h:mma'
  }
}
