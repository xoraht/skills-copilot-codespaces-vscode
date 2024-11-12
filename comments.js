// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Create server
http.createServer((req, res) => {
  // Get URL
  const urlParts = url.parse(req.url);
  // Get URL path
  const pathName = urlParts.pathname;
  // Get file extention
  const extName = path.extname(pathName);
  // Get the file path
  const filePath = __dirname + pathName;

  // Read file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      // Set the header
      let contentType = 'text/html';
      if (extName === '.js') {
        contentType = 'text/javascript';
      }
      res.writeHead(200, { 'Content-Type': contentType });
      // Output the file
      res.end(data);
    }
  });
}).listen(1337, '127.0.0.1');