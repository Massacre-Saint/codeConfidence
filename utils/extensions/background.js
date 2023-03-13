/*  Requests */

const deleteBookmark = (id) => new Promise((resolve, reject) => {
  console.warn(id);
  fetch(`http://127.0.0.1:8000/bookmarks/${id}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});
const createBookmarks = (data) => new Promise((resolve, reject) => {
  fetch('http://127.0.0.1:8000/bookmarks', {
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

chrome.bookmarks.onRemoved.addListener((id) => {
  const pk = parseInt(id, 10);
  deleteBookmark(pk);
});

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  chrome.bookmarks.get(bookmark.parentId)
    .then((parent) => {
      if (parent[0].title === 'Code Confidence Resources') {
        createBookmarks(bookmark);
      }
    });
});

chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
  chrome.bookmarks.search({ title: 'Code Confidence Resources' }, (nodes) => {
    const ccBookmarksId = nodes[0].id;
    if (nodes.length === 1 && (moveInfo.parentId === ccBookmarksId)) {
      chrome.bookmarks.get(id).then((parent) => createBookmarks(parent[0]));
      chrome.bookmarks.getChildren(id, (children) => {
        children.forEach((child) => {
          createBookmarks(child);
        });
      });
    } else if (nodes.length === 1 && (moveInfo.oldParentId === ccBookmarksId)) {
      deleteBookmark(id);
    }
  });
});
