const downloadData = (data) => {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({
    url,
    filename: 'bookmark_data.json',
    saveAs: false,
  });
};
const handleBookmarkData = () => {
  chrome.bookmarks.getTree()
    .then(() => {
      chrome.bookmarks.getSubTree('1')
        .then((subTree) => {
          const firstBookmarkId = subTree[0].id;
          chrome.bookmarks.get(firstBookmarkId)
            .then(() => {
              chrome.bookmarks.getChildren(firstBookmarkId)
                .then(() => {
                  chrome.bookmarks.search({ title: 'Code Confidence Resources' })
                    .then((codeResourceNode) => {
                      chrome.bookmarks.getSubTree(codeResourceNode[0].id)
                        .then((obj) => {
                          const data = JSON.stringify({ codeResourceNode, ...obj });
                          downloadData(data);
                        });
                    });
                });
            });
        });
    });
};

const createBookmarkFolder = () => {
  const location = chrome.bookmarks.getTree().then(() => chrome.bookmarks.getSubTree('1'));
  chrome.bookmarks.create({
    parentId: '1',
    index: 0,
    title: 'Code Confidence Resources',
  });
};
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('create').addEventListener('click', () => {
    createBookmarkFolder();
  });
  document.getElementById('export').addEventListener('click', () => {
    handleBookmarkData();
  });
});

const downloadData = (data) => {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const filePath = '/Code-Confidence/utils/extensions/cc_bookmarks.json';

  chrome.runtime.sendMessage({ type: 'getBookmarkFolderId' }, (response) => {
    const bookmarkFolderId = response.folderId;
    if (bookmarkFolderId) {
      chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
        suggest({ filename: filePath, conflictAction: 'uniquify' });
      });
      chrome.downloads.download({
        url,
        conflictAction: 'uniquify',
      }, () => {
        chrome.downloads.onDeterminingFilename.removeListener();
      });
    }
  });
};
