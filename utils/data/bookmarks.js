const getBookmarks = (user) => new Promise((resolve, reject) => {
  fetch('/extentions/cc_bookmark_data.json', {
    headers: {
      Authorization: user.uid,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const jsonData = data;
      console.warn(jsonData);
    })
    .catch(reject);
});
export default getBookmarks;
