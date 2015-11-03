import R from 'ramda'
import moment from 'moment'


const weekStartDate = moment().day(R.negate(moment().day()))

export function now(formatter = 'MMM Do') {
  return R.range(0, 7).map(d =>
    R.clone(weekStartDate)
      .day(d)
      .format(formatter)
  )
}

export function next(formatter = 'MMM Do') {
  return R.range(0, 7).map(d =>
    R.clone(weekStartDate)
      .day(d + 7)
      .format(formatter)
  )
}

export function prev(formatter = 'MMM Do') {
  return R.range(0, 7).map(d =>
    R.clone(weekStartDate)
      .day(d - 7)
      .format(formatter)
  )
}