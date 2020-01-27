# Train-Scheduler

## What is this repo?

-This repo was created to practice utilizing Firebase for it's database capabilities. The Train-scheduler makes use of the database to store and retrieve train-schedule information. Once the information is retrieved, moment.js is used to calculated the specific trains next arrival and how many minutes away it is. 

-New train schedules can be added into the database and in return to the data table.

## How was this project created?

-Coding was done using Visual Studio Code ("https://code.visualstudio.com/") a text editor can be downloaded from their website.

-The styling for this project was done using CSS and Bootstrap ("https://getbootstrap.com/").
 -Bootstrap was linked via CDN inside the 'head' tags within an opening script tag, Bootstrap conveniently offers these links on there side and are ready to be copied and pasted into the html file.
 -Local CSS file created and used to style. Linked in between 'head' tags and within an opening 'script' tag, the file path relative to the html file, and closed by a closing script tag. 

-assets folder created to hold CSS code, JS code, and images. 

-Database created via Firebase ("https://firebase.google.com/").
 -Upon creating an account, a new project can be started utilizing realtime database. The script links to place within the head of the html file are conveniently provided. As well as code to place within your JS file to initialize the database associated with the current application.
 -*make sure to go under the "rules" section within the realtime database and change the rules for "read" and "write" from false to true, then be sure to publish the changes to "save".

-Time calculations computed using JS library "moment.js ("https://momentjs.com/").
 -Like many JS libraries moment.js can be installed/linked many different ways. For this particular project moment.js was installed to the project directory through terminal via an npm package install. 

-Jquery and JqueryUI Libraries were linked via CDN link in the "head" tags on the html and a script tag associated with the cdn link itself.
 -Jquery and JqueryUI can be installed via terminal as an npm package install, or linked via cdn. to obtain a cdn link vist Jquery's website ("https://code.jquery.com/")/("https://code.jquery.com/ui/").

### Bootstrap
-Bootstrap has be used in this project to create: <br>

-A jumbotron to serve as the header of the page.

-Two card bodies to: <br>

 -In the first card: Place an empty table inside. Only defining the table headers. The table rows will later be appended within the JS file.
 
 -In the second card: Place four input forms, each given a specific Id to be used to retrieve their value. And a "submit" button, used to create an  on click function within the JS file where the inputted values can be worked with, re assigned, and uploaded to the database.

### Javascript/Jquery
-Javascript file was created to write the logic for the Train-scheduler. Inside this JS file we use Jquery to: <br>

-Utilize firebase by pasting in the code provided from our specific firebase database project.

-Create an on click event for the forms "submit" button. This will pull the value from the input fields and associate them to specific variables we will then use to store into an object that will be pushed to the database.

-Create another on click event for the "update" button. This will simply reload/refresh the window. We use this to update the minutesAway and nextArrival variables within the data table.

-The object's that are pushed to then database are then retrieved from the database and listed by order added within the table.
 -This is done by creating a table row for each object with jquery then pulling the specific variables from each object and assigning them to new variables that will represent the specific table data slots they will fall into.
 -At this point moment.js comes into play by using the frequency and firstTrainTime variables as well as the currentTime variable to compute the minutesAway and nextArrival variables with methods provided by moment.js.
 -Each table row then appends the table data in a specific order to match the table headers. Then the table row is appended from the table body.
 -Each object now has its own table row, appended in the order added to the database, with table data specific to that object.
 -By computing the time for the nextArrival and minutesAway variables on retrieval of the data, every time the page is refreshed the tables rows are re-created and appended to the table body and the time data is updated to reflect the current time.

### JqueryUI
-JqueryUI in this project is simply used to create a dialog box that will appear once the "submit" button has been clicked to inform the user the train has been successfully added. It is not necessary to add this.

-In the HTML file: <br>

 -A div is created at the end of the body of the html (before the closing tag). The div is assigned an id of dialog. Between the opening and closing div tags the text for the dialog box is placed.

-In the JS file: <br>

 -Within the document.ready function, the dialog box is selected by the id, and the dialog method used to assign auto-open to close.
 -Within the "submit" button on click function the dialog box is then again selected by its id, and the dialog method is then used to open the box.
 -The dialog box must be closed via the close button at the top. The dialog box and close button beyond what is described above are all defined by the JqueryUI library.
 
#### Guidelines for Collaboration

-As I am still new to coding, and my initial projects will be used to create a portfolio to show to potential employers, i ask that no modifications are made at this time.

**However**

 -Any input to improve my coding would be GREATLY appreciated. I am not opposed to the files being pulled for the sake of modifying and using as an example to teach/explain alt. methods, better practice, etc. Again I would ask they not be pushed to the repo to modify the initial document, but instead be sent to me an some alt. way.

 --Thank you for taking the time to look over this 'README' file--