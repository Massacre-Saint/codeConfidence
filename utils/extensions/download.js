// const downloadData = (data) => {
//   const blob = new Blob([data], { type: 'application/json' });
//   const url = URL.createObjectURL(blob);
//   chrome.downloads.download({
//     url,
//     filename: 'cc_bookmark_data.json',
//     saveAs: false,
//   });
// };

// const handleBookmarkData = () => {
//   chrome.bookmarks.getTree()
//     .then(() => {
//       chrome.bookmarks.getSubTree('1')
//         .then((subTree) => {
//           const firstBookmarkId = subTree[0].id;
//           chrome.bookmarks.get(firstBookmarkId)
//             .then(() => {
//               chrome.bookmarks.getChildren(firstBookmarkId)
//                 .then(() => {
//                   chrome.bookmarks.search({ title: 'Code Confidence Resources' })
//                     .then((codeResourceNode) => {
//                       chrome.bookmarks.getSubTree(codeResourceNode[0].id)
//                         .then((obj) => {
//                           console.warn('obj', JSON.stringify(obj));
//                           const data = JSON.stringify(obj);
//                           downloadData(data);
//                         });
//                     });
//                 });
//             });
//         });
//     });
// };

// const createBookmarkFolder = () => {
//   chrome.bookmarks.create({
//     parentId: '1',
//     index: 0,
//     title: 'Code Confidence Resources',
//   });
// };
// document.addEventListener('DOMContentLoaded', () => {
//   document.getElementById('export').addEventListener('click', () => {
//     handleBookmarkData();
//   });
// });
