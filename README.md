# 09-homework
Lines 1 - 10
    These are the required npm pacakges and doc's index.js's code utilizes.

Function control()
    This is an async funcgion that uses controls the order in which functions are called.

    1. promtUser() - retrieves github user name and color choice from user.

    2. gsQuery() - takes user answers as and argument and returns the data from gs(github scrapper) via making it a new promise.

    3. builder.makeprofile() - takes the data returned from gsQuery() as an argument and creates an object of the data needed for the profile.

    4. generateHTML() - takes the data object from makeprofle() and user answers as arguments.  The dataObject conentts are pluged into the html, and the color selection from answers is applied to the style page. The 'html' contents are returned as variable 'html'.

    5. writeFileAsync - creates an html file using the html variable returned from generateHTML();

    6. Finally, pdfMake(), a nested async function, creates a resume.pdf of index.html using the puppeteer npm package. 

