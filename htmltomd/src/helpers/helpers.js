import { upload } from '../config/multerConfig.js';
import fs from "fs";
import path from "path";
import TurndownService from 'turndown';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const turndownService = new TurndownService();

export const handleFileUpload = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Internal Server Error" }));
            return;
        }

        const file = req.file;
        if (!file) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "No file uploaded" }));
            return;
        }

        const inputPath = file.path;
        const outputDir = path.join(__dirname, '../outputFolder');
        const outputPath = path.join(outputDir, `${path.basename(file.originalname, '.html')}.md`);


        fs.readFile(inputPath, 'utf8', (err, html) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Internal Server Error" }));
                return;
            }
            
            // Convert HTML to Markdown
            const markdown = turndownService.turndown(html);

            fs.writeFile(outputPath, markdown, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Internal Server Error" }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<html>
                            <head><title>Upload Success</title></head>
                            <body>
                                <p>File converted successfully!</p>
                                <a href='/outputFolder/${path.basename(outputPath)}'>Link to the Markdown file</a>
                            </body>
                        </html>`);
            });
        });
    });
};


export const serveFile = (req, res, url) => {
    const filePath = path.join(__dirname, '..' + url);
    //  /outputFolder/blog-section.md
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'File Not Found' }))
            return
        }
        res.writeHead(200, { 'Content-Type': 'text/markdown' });
        res.end(data);
    })
}