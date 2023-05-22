const progressStyleHanlder = (integer) => {
  if (integer === null) {
    console.warn('i null');
    return '';
  } if (integer >= 25) {
    return 'progress-25';
  } if (integer === 50) {
    console.warn('i returned 50');
    return 'progress-50';
  } if (integer === 75) {
    console.warn('i returned 75');
    return 'progress-75';
  }
  console.warn('i returned 100');
  return 'progress-100';
};
export default progressStyleHanlder;
