/*
  Set amount number of digits. Add 0 to number which have less then amount
  example: 2 -> 02
*/
minDigits = (number, amount = 2) => {
  return (new Array(amount).join('0') + number).slice(-amount);
}

/*
  Get current timezone in format +01, -01, -12, - 09:30, 0 (for utc 0)
*/
getCurrentTimezone = (encode = false) => {

  // Get timezone offset in hours
  const timezoneOffset = new Date().getTimezoneOffset() / -60;

  // Get hours (integer part)
  const hoursNumb = Math.floor(Math.abs(timezoneOffset));
  let hoursStr = minDigits(hoursNumb);

  // Get minutes (fraction part)
  const minutesNumb = (Math.abs(timezoneOffset) - hoursNumb) * 60;
  let minutesStr = minutesNumb !== 0
    ? ':' + minDigits(minutesNumb)
    : '';

  // add '+'/'-' if timezoneOffset is positive/negative
  const prefix = timezoneOffset !== 0
    ? timezoneOffset > 0 ? '+' : '-'
    : '';

  if (!encode) {
    return `${prefix}${hoursStr}${minutesStr}`;
  }

  return encodeURIComponent(`${prefix}${hoursStr}${minutesStr}`);
}

module.exports = {
  minDigits,
  getCurrentTimezone,
}
