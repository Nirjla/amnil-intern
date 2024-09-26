import http from "http";
import { handleFileUpload, serveFile } from './helpers/helpers.js';

const PORT = 8000;

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/api' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Welcome to HTML to Markdown Converter!' }));
    } else if (url === '/api/upload' && req.method === 'POST') {
        handleFileUpload(req, res);
    }
    else if (url.startsWith('/outputFolder/') && req.method === 'GET') {
        serveFile(req, res,url);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
