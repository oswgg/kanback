import _ from 'joi'
import date from '@joi/date'
const _date = _.extend(date)

export default _.object({
    expiration_date: _date.date().format('YYYY-MM-DD').required(),
}).unknown(false)
