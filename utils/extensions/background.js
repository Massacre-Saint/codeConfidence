const globalData = {};

chrome.runtime.onInstalled.addListener(() => {
  // create a bookmark folder
  chrome.bookmarks.create({
    parentId: '1',
    index: 0,
    title: 'Code Confidence Resources',
  }, (folder) => {
    // store the ID of the bookmark folder in a global object
    globalData.folderId = folder.id;
  });

  // add a message to the console
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message);
  if (message.type === 'getBookmarkFolderId') {
    chrome.storage.local.get(globalData, (result) => {
      console.log('Sending response:', result);
      sendResponse(result);
    });
  }
  return true;
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log('Received message:', message);
//   if (message.type === 'getRootDirectory') {
//     const rootDirectory = chrome.runtime.getURL('/');
//     console.log('Sending response:', { rootDirectory });
//     sendResponse({ rootDirectory });
//   }
//   return true;
// });
