const brewDate = require('brew-date');


// Get date between of given date and sub that with the given number!
function getDateBetweenBySub(date, sub){
  const getDate = brewDate.reverseDate(brewDate.format(date, "dd/mm/yyyy"));
  const getSubDate = brewDate.reverseDate(brewDate.format(brewDate.subDates(date, sub), "dd/mm/yyyy"));
  const getBetween = brewDate.getBetween(getSubDate, getDate);
  return getBetween
}

module.exports = {
  getDateBetweenBySub
}