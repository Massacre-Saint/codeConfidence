const progressStyleHanlder = (integer) => {
  if (integer === null || integer === 0) {
    return '';
  }

  switch (true) {
    case (integer <= 25):
      return 'progress-25';
    case (integer <= 50):
      return 'progress-50';
    case (integer <= 75):
      return 'progress-75';
    default:
      return 'progress-100';
  }
};

export default progressStyleHanlder;
