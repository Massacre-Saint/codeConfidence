import React from 'react';
import ReactDOM from 'react-dom';

export default function BookmarkPopUp() {
  const handleDownload = () => {
    function extractBookmarks(nodes, folder) {
      let bookmarks = [];
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.children) {
          if (folder) {
            if (node.title === folder) {
              bookmarks = bookmarks.concat(extractBookmarks(node.children));
            }
          } else {
            bookmarks = bookmarks.concat(extractBookmarks(node.children));
          }
        } else {
          bookmarks.push({ title: node.title, url: node.url });
        }
      }
      return bookmarks;
    }

    function createHtml(bookmarks) {
      let html = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<title>Bookmarks</title>\n</head>\n<body>\n<ul>\n';
      for (let i = 0; i < bookmarks.length; i++) {
        const bookmark = bookmarks[i];
        html += `<li><a href="${bookmark.url}">${bookmark.title}</a></li>\n`;
      }
      html += '</ul>\n</body>\n</html>';
      return html;
    }

    function download(content, filename, contentType) {
      const a = document.createElement('a');
      const file = new Blob([content], { type: contentType });
      a.href = URL.createObjectURL(file);
      a.download = filename;
      a.click();
    }
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('export').addEventListener('click', () => {
        const format = document.getElementById('format').value;
        const folder = document.getElementById('folder').value;
        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
          const bookmarks = extractBookmarks(bookmarkTreeNodes[0].children, folder);
          const content = format === 'json' ? JSON.stringify(bookmarks) : createHtml(bookmarks);
          download(content, `${folder}.${format}`, `text/${format}`);
        });
      });
    });
  };
  return (
    <>
      <h1>Export Bookmarks</h1>
      <form>
        <p>
          <label htmlFor="format">File Format:</label>
          <select id="format" name="format">
            <option value="json">JSON</option>
          </select>
        </p>
        <p>
          <label htmlFor="folder">Folder Name:</label>
          <input type="text" id="folder" name="folder" />
        </p>
        <p>
          <button id="export" type="button" onClick={handleDownload}>Export</button>
        </p>
      </form>
    </>
  );
}

ReactDOM.render(<BookmarkPopUp />, document.getElementById('root'));
