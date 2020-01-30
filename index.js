const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const gs = require('github-scraper');
const util = require("util");
const builder = require("./generatedhtml");
const open = require('open');
const puppeteer = require('puppeteer');
const writeFileAsync = util.promisify(fs.writeFile);
//const pdf = require('html-pdf');
//const options = { format: 'Letter' };

control();

async function control() {
    try {
      const answers = await promptUser();
      console.log(answers);
      const gs = await gsQuery(answers);
      const dataObject = builder.makeprofile(gs); //make answers part of dataObject
      const html = builder.generateHTML(dataObject, answers);
      writeFileAsync("index.html", html);
      //const pdfMake = makePDF(dataObject, html);
      //console.log(pdfMake);
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
            resolve(data);
        })
    })
}


// function makePDF (dataObject, html){
// }
    // (async function pdfMake(dataObject, html) {
    //     try{

    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();
    //     await page.setContent(html);
    //     await page.emulateMedia('screen');
    //     await page.pdf({
    //         path: 'resume.pdf', 
    //         format: 'A4',
    //         printBackground: true
    //     });

    //     console.log("done");
    //     await browser.close();
    //     process.exit();
      
    //     } catch (e) {
    //     console.log("error", e);
    //     }
    // })();
    // var html = fs.readFileSync(html, 'utf8');
    // var options = { format: 'Letter' };

    // pdf.create(html, options).toFile(`/Users/nicholasmcconnell/Desktop/resume.pdf`, function(err, res) {
    //     //writeFileAsync("resume.pdf", res);
    //     if (err) return console.log(err);
    //    console.log(res, "PDF"); // { filename: '/app/businesscard.pdf' }
    //     });



// const generateData = () => {
//     gs(`/${answers.username}`, function(err, data) {
//                     // console.log(data); // or what ever you want to do with the data
                    
//                     dataObject.repos = data.repos;
//                     dataObject.name = data.name;
//                     dataObject.followers = data.followers;
//                     dataObject.following = data.following;
//                     dataObject.stars = data.stars;
//                     dataObject.location = data.location;
//                     dataObject.website = data.website;
//                     dataObject.worksfor = data.worksfor;
//                     dataObject.avatar = data.avatar;
//                     dataObject.github = "https://github.com/" + data.url;
                
//                     //console.log(dataObject.github);
//                   })

    
//}

// Functions Needed
//1. get user data
//2. get gr call data
//3. plug them into html -- built html
//4 object of data
//5. html
//googlemaps
//6. user to github query to object creator - to html generator - to html build.
//PDF

//async await


//const dataObject = {};
//console.log(dataObject);

//Original attempt
// promptUser()
// .then(function(answers){
//         gs(`/${answers.username}`, function(err, data) {
//             console.log(data); // or what ever you want to do with the data
            
//             dataObject.repos = data.repos;
//             dataObject.name = data.name;
//             dataObject.followers = data.followers;
//             dataObject.following = data.following;
//             dataObject.stars = data.stars;
//             dataObject.location = data.location;
//             dataObject.website = data.website;
//             dataObject.worksfor = data.worksfor;
//             dataObject.avatar = data.avatar;
//             dataObject.github = "https://github.com/" + data.url;
//             generateHTML(dataObject, answers);
//             console.log(dataObject);
//         })
//         //console.log(dataObject);
//         // let html = generateHTML(dataObject);
        
//          //return writeFileAsync("index.html", html);
//     })
    
// function writeToFile(fileName, data) {
 
// }

// function init() {

// }

// init();