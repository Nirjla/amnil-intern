import fs from "fs"
import TurndownService from 'turndown'
import { fileURLToPath } from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
console.log("FileUrl rn", import.meta.url)
console.log(__filename)

const __dirname = path.dirname(__filename)
console.log(__dirname)

const turndownService = new TurndownService()
function htmltoMarkdown(inputPath, outputPath) {
      const results = process.argv // returns any array of paths of node js execution path, second is file in which it is executed and remaining command line ko args
      console.log("ResultsOfCLI", results)

      fs.readFile(inputPath, 'utf8', (err, html) => {
            if (err) {
                  console.error(`Error reading HTML file: ${err.message}`)
                  process.exit(1) //terminates nodejs process 
            }
            const markdown = turndownService.turndown(html)
            // console.log("MarkdownData", markdown)
            fs.writeFile(outputPath, markdown, (err) => {
                  if (err) {
                        console.error(`Error reading HTML file: ${err.message}`)
                        process.exit(1)
                  }
                  console.log(`Markdown file saved as ${outputPath}`)
            })
      })
}

const [inputFilePath] = process.argv.slice(2);
if (!inputFilePath) {
      console.error('Please provide the path to the HTML file.');
      process.exit(1);
}

const inputPath = path.resolve(inputFilePath);
console.log("InputPath", inputPath)
console.log("Basename", path.basename(inputPath, '.html')) //extract ext
const outputPath = path.join(__dirname, 'uploads', `${path.basename(inputPath, '.html')}.md`);
console.log("OutputPath", outputPath)

htmltoMarkdown(inputPath, outputPath);