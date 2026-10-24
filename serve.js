import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 4321;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  
  if (reqPath.startsWith('/Portfolio_Website')) {
    reqPath = reqPath.slice('/Portfolio_Website'.length);
  }
  if (!reqPath || reqPath === '/') {
    reqPath = '/index.html';
  }

  let filePath = path.join(DIST_DIR, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (err2, stats2) => {
        if (!err2 && stats2.isFile()) {
          serveFile(indexPath, res);
        } else {
          const rootIndex = path.join(DIST_DIR, 'index.html');
          fs.stat(rootIndex, (err3) => {
            if (!err3) {
              serveFile(rootIndex, res);
            } else {
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('404 Not Found');
            }
          });
        }
      });
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error: ' + err.code);
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    }
  });
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}/Portfolio_Website/`);
});
