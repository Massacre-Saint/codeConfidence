/*  Requests */
const dbUrl = 'http://127.0.0.1:8000';
const getBookmarks = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/bookmarks`)
    .then((response) => response.json())
    .then((data) => {
      const transformedData = data.map((obj) => {
        const {
          id,
          index,
          parent_id: parentId,
          title,
          url,
        } = obj;
        return {
          id,
          index,
          parentId,
          title,
          url,
        };
      });
      resolve(transformedData);
    })
    .catch(reject);
});
const updateBookmark = (id, data) => new Promise((resolve, reject) => {
  const requestBody = {
    index: data.index,
    parent_id: data.parentId,
    title: data.title,
    url: data.url,
  };

  if (data.url) {
    requestBody.url = data.url;
  }
  fetch(`${dbUrl}/bookmarks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(requestBody),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});

const createBookmarks = (data) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/bookmarks`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const deleteBookmark = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/bookmarks/${id}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});
/* Listeners */

const globalData = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.bookmarks.create({
    parentId: '1',
    index: 0,
    title: 'Code Confidence Resources',
  }, (folder) => {
    globalData.folderId = folder.id;
    createBookmarks(folder);
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getBookmarkFolderId') {
    chrome.storage.local.get(globalData, (result) => {
      sendResponse(result);
    });
  }
  return true;
});
const parentEvaluation = (bookmark) => {
  if (bookmark.title === 'Code Confidence Resources') {
    return true;
  } return false;
};
chrome.bookmarks.onRemoved.addListener((id) => {
  const pk = parseInt(id, 10);
  deleteBookmark(pk);
});

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  const isParentBookmark = parentEvaluation(bookmark);
  if (!isParentBookmark) {
    createBookmarks(bookmark);
  }
});

chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
  getBookmarks().then((bookmarkArray) => {
    const bookmarks = bookmarkArray;
    const existingBookmarkNode = bookmarks.some((bookmark) => bookmark.id === parseInt(id, 10));
    const updatingExistingNode = bookmarks.some((bookmark) => parseInt(moveInfo.parentId, 10) === bookmark.id);
    if (!existingBookmarkNode) {
      chrome.bookmarks.getSubTree(id, (tree) => {
        createBookmarks(tree[0]);
      });
      // create
    } else if (existingBookmarkNode && updatingExistingNode) {
      // update
      chrome.bookmarks.get(id, (bookmark) => {
        const pk = parseInt(id, 10);
        updateBookmark(pk, bookmark[0]);
      });
    } else {
      deleteBookmark(id);
    }
  });
});

chrome.bookmarks.onChanged.addListener((id) => {
  const pk = parseInt(id, 10);
  chrome.bookmarks.get(id, (bookmark) => {
    updateBookmark(pk, bookmark[0]);
  });
});
