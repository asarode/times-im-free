import R from 'ramda'
import moment from 'moment'


const weekStartDate = moment()

export function now() {
  return R.range(0, 7).map(d => R.clone(weekStartDate).day(d))
}

export function next(startWeek = [weekStartDate]) {
  return R.range(0, 7).map(d => R.clone(startWeek[0]).day(d + 7))
}

export function prev(startWeek = [weekStartDate]) {
  return R.range(0, 7).map(d => R.clone(startWeek[0]).day(d - 7))
}
