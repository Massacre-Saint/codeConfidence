const convertTime = (time) => {
  const timeStamp = new Date(time);
  const now = new Date();
  const timeDiff = now.getTime() - timeStamp.getTime();
  const timeDiffSeconds = Math.floor(timeDiff / 1000);

  let timeUnit;
  let timeDiffValue;
  if (timeDiffSeconds < 60) {
    timeUnit = 'second';
    timeDiffValue = timeDiffSeconds;
  } else if (timeDiffSeconds < 3600) {
    timeUnit = 'minute';
    timeDiffValue = Math.floor(timeDiffSeconds / 60);
  } else if (timeDiffSeconds < 86400) {
    timeUnit = 'hour';
    timeDiffValue = Math.floor(timeDiffSeconds / 3600);
  } else {
    timeUnit = 'day';
    timeDiffValue = Math.floor(timeDiffSeconds / 86400);
  }
  if (timeDiffValue !== 1) {
    timeUnit += 's';
  }
  return `Last updated ${timeDiffValue} ${timeUnit} ago`;
};
export default convertTime;
