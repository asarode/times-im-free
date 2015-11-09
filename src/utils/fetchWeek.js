import R from 'ramda'
import moment from 'moment'


const current = moment()

export function now() {
  return R.range(0, 7).map(d => floor(R.clone(current).day(d)))
}

export function next(startWeek = [current]) {
  return R.range(0, 7).map(d => floor(R.clone(startWeek[0]).day(d + 7)))
}

export function prev(startWeek = [current]) {
  return R.range(0, 7).map(d => floor(R.clone(startWeek[0]).day(d - 7)))
}

function floor(date) {
  return date.hours(0).minutes(0).seconds(0).milliseconds(0)
}
