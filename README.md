# Developer Profile Generator
A CLI application that creates a PDF of a user's GitHub profile stats.

## Overview

This application is a command-line application that dynamically generates a PDF profile from a GitHub username. The application will be invoked with the following command:

```sh
node index.js
```

This command-line application will allow for quick and easy generation of developer profiles in PDF format.

## Utilizing the App

- The user will open the `index.js` file in their terminal and run the command `npm i`, then run the command `node index.js`.

- The user will be prompted for their GitHub username and a favorite color, which will be used as the color for their PDF.

- The PDF will be populated with the following: the users profile image & name, links to location via Google Maps, GitHub profile & user blog along with the user's GitHub page content such as: bio, number of public repositories, number of followers, number of GitHub stars, and number of users following.

## Demo

![Developer Profile Generator](./img/dev-gen-demo.gif "Developer Profile Generator")

## Tech used

- HTML
- CSS
- Bootstrap
- Javascript
- Node.js
- NPM - _inquirer, axios, pupeteer, github-scraper

## Contributers

- Nick McConnell
