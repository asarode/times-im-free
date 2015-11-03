'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import R from 'ramda'

export default class DayColumn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      selecting: {},
      selectionStart: null,
      selected: {}
    }
  }

  static PropTypes = {
    shouldDelete: PropTypes.bool.isRequired,
    day: PropTypes.object,
    onSelection: PropTypes.func
  }

  onTimeDown(e, hour) {
    const { shouldDelete } = this.props
    this.setState({
      active: true,
      selecting: {
        [hour]: !shouldDelete
      },
      selectionStart: hour
    })
  }

  onTimeUp(e, hour) {
    const { selecting, selected } = this.state
    const { onSelection, day } = this.props
    this.setState({
      active: false,
      selecting: {},
      selected: {
        ...selected,
        ...selecting
      },
      selectionStart: null
    })
    onSelection({...selected, ...selecting})
  }

  onTimeOver(e, hour, numSlices) {
    if (!this.state.active) return
    const { selectionStart } = this.state
    this._fillRange(hour, selectionStart, numSlices)
  }

  _fillRange(t1, t2, slices) {
    const { shouldDelete } = this.props
    let range = {}
    const inc = 1 / slices
    const start = t1 > t2 ? t2 : t1
    const end = t1 > t2 ? t1 : t2
    const check = shouldDelete
    const value = !shouldDelete
    for (let hr = start; hr <= end; hr += inc) {
      if (range[hr] !== check) range[hr] = value
    }
    this.setState({
      selecting: range
    })
  }

  onTimeLeave(e) {
    this.setState({
      active: false,
      selecting: {}
    })
  }

  timeBlocks(numSlices) {
    if (numSlices < 1) {
      throw(
        `Enter an appropriate time slice. For example, you can split an hour in
        4 slices, or 3 slices, but it doesn't make sense to slice it in
        0.5 slices.
        `
      )
    }

    return R.range(0, 24).map(hour => (
      <div key={hour} className='cal-TimeBlock'>
        {this.timeSlices(numSlices, hour)}
      </div>
      )
    )
  }

  timeSlices(numSlices, hour) {
    const { selecting, selected } = this.state
    return R.range(0, numSlices).map(i => {
      const timeSlice = hour + (i / numSlices)
      return (
        <div
          key={timeSlice}
          onMouseDown={e => this.onTimeDown(e, timeSlice)}
          onMouseUp={e => this.onTimeUp(e, timeSlice)}
          onMouseOver={e => this.onTimeOver(e, timeSlice, numSlices)}
          className={cx('cal-TimeBlock-slice', {
            'cal-TimeBlock-slice--selecting': selecting[timeSlice],
            'cal-TimeBlock-slice--selected': selected[timeSlice]
        })}/>
      )
    })
  }

  render() {
    const { day } = this.props
    return (
      <div className='cal-DayColumn'>
        <div className='cal-DayColumn-title cal-column-title'>
          {day.code}
        </div>
        <div
          className='cal-DayColumn-times'
          onMouseLeave={e => this.onTimeLeave(e)}>
          {this.timeBlocks(4)}
        </div>
      </div>
    )
  };
}

const TimeBlock = ({
  onMouseDown,
  onMouseUp,
  onMouseOver,
  selecting,
  selected,
  hour,
}) => (
  <div
    key={hour}
    onMouseDown={e => onMouseDown(e, hour)}
    onMouseUp={onMouseUp}
    onMouseOver={e => onMouseOver(e, hour)}
    className={cx('cal-TimeBlock-slice', {
      'cal-TimeBlock-slice--selecting': selecting[hour],
      'cal-TimeBlock-slice--selected': selected[hour]
  })}/>
)
TimeBlock.propTypes = { slice: PropTypes.number }
TimeBlock.defaultProps = { slice: 4 }
