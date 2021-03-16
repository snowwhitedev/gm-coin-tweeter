export function ellipsisTxt(str, cnt = 22) {
  /** ellipsis max length 7 characters */
  if (str && str.length < cnt) {
    return str;
  }
  return str.substring(0, cnt) + '...';
}

export function getTimeSince(timeStr) {
  const now = new Date();
  const timeStamp = new Date(timeStr);
  const secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + 's';
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + 'm';
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + 'h';
  }
  if (secondsPast > 86400) {
    const day = timeStamp.getDate();
    const month = timeStamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(' ', '');
    const year =
      timeStamp.getFullYear() === now.getFullYear()
        ? ''
        : ' ' + timeStamp.getFullYear();
    return day + ' ' + month + year;
  }
}
