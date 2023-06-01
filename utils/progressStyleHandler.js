const progressStyleHanlder = (integer) => {
  if (integer === null) {
    return '';
  } if (integer <= 25) {
    return 'progress-25';
  } if (integer > 25 && integer <= 50) {
    return 'progress-50';
  } if (integer > 50 && integer <= 75) {
    return 'progress-75';
  }

  return 'progress-100';
};
export default progressStyleHanlder;
