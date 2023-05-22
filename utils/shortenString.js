const shortenString = (string) => {
  if (string.length > 20) {
    return `${string.slice(0, 27)}...`;
  } return string;
};

export default shortenString;
