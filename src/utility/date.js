import moment from 'moment';

export const todayWithFormat = (format) => {
  // format: 'DD/MM/YYYY'
  return moment().format(format);
};

/*
convert 2020-09-15: YYYY-MM-DD
const date = moment('2020-09-15','YYYY-MM-DD')
const date2 = date.format('DD/MM/YYYY')
*/

/* compare two dates
var date1 = "2010-10-20";
var date2 = "2010-10-20";
var time1 = moment(date1).format('YYYY-MM-DD');
var time2 = moment(date2).format('YYYY-MM-DD');
if(time2 > time1){
}else if(time2 > time1){
}else{
}

*/

/* COMMON
moment() // today
moment.format('DD/MM/YYYY')







*/
