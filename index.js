const fs = require("fs");
const inquirer = require("inquirer");
const gs = require('github-scraper');
const util = require("util");
const builder = require("./generatedhtml");
const open = require('open');
const puppeteer = require('puppeteer');
const writeFileAsync = util.promisify(fs.writeFile);

control();

async function control() {
    try {
      const answers = await promptUser();
      const gs = await gsQuery(answers);
      const dataObject = builder.makeprofile(gs);
      const html = builder.generateHTML(dataObject, answers);
      writeFileAsync("index.html", html);
  
      (async function pdfMake(dataObject, html) {
        try{

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            const htmlToPdf = await fs.readFileSync("index.html", "utf-8");
            await page.setContent(htmlToPdf);
            await page.emulateMedia('screen');
            await page.pdf({
            path: 'resume.pdf', 
            format: 'letter',
            printBackground: true
        });

        console.log("done");
        await browser.close();
        process.exit();
      
        } catch (e) {
        console.log("error", e);
        }
    })();
     
    } catch (err) {
        console.log(err);
      }
};

 function promptUser() {
    return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?"
    },
    {
      type: "list",
      name: "color",
      message: "Choose a color!",
      choices: [
          "blue",
          "pink",
          "green",
          "red"
        ]
    },
    ]);

}

function gsQuery(answers){
    return new Promise(resolve => {
        gs(`/${answers.username}`, function(err, data) {
          if(err){
            return reject(err);
          }
            resolve(data);
        })
    })
}
