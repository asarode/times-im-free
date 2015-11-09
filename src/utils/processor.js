import R from 'ramda'
import moment from 'moment'

export function getRanges(selected, slices) {
  return R.keys(selected).map(timestamp => {
    const inc = 1 / slices
    const day = moment(timestamp, 'x')
    const numericalOrder = (a, b) => a - b
    const avail = R.sort(
      numericalOrder,
      R.invert(selected[timestamp])[true]
    ).map(str => Number(str))
    let ranges = [{}]
    avail.forEach((hour, i, arr) => {
      if (R.last(ranges).start === undefined) {
        ranges[ranges.length - 1].start = hour
        ranges[ranges.length - 1].end = hour + inc
      }
      else if (hour === R.last(ranges).end) {
        ranges[ranges.length - 1].end = hour + inc
      }
      else {
        ranges.push({ start: hour, end: hour + inc })
      }
    })
    return {
      ranges,
      moment: day
    }
  })
}
