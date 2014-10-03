Name			: Shrutika Dasgupta
UNI				: sd2841
Email			: sd2841@columbia.edu
Project	Name	: imFlickr - Improved Flicker

Instructions to Run and host the project on local server
---------------------------------------------------------

1) The project is built on Node.js server, implementing the Express module. 
2) It is required to have Node.js installed in the host machine to host this project. Instructions to which are provided in:
		http://www.nodejs.org
3) For running the project first, it is required to go inside the project directory(/sd2841_ass1_part3) and preform the action :
		$ npm install
	This will install all the required dependencies for the project that might be required to run the project.
4) The server is to be turned on using the file app.js. Run the following command
		$ nodemon ./bin/www
5) Then going to the browser, please type the following in the address bar:
		http://localhost:3000/
6) On clicking enter you will be redirected to the project website.

User Interface Design Decisions
--------------------------------

1) The UI is so designed so that it tries to statisfying maximum of the "Usability Design Heuristics".
2) A few of the statistics that have been taken care of are:
	- Visibility of System Status: The user is informed of all the validation errors that have occured when entering the data by appropriate error message handling. Also the "load more images" button is disabled when no more images are available to load.
	- Match between System and real World: The language and instructions are kept very clean an simple, thus easy to comprehend.
	- User Control and Freedom: Due to appropriate error handling mechanisms, the user is given a flexibility to given inputs that are not valid and the user is redirected to the same page if anything goes wrong. This gives the user the flexibility to play around with the application.
	- Consistency and Standards: The UI is so designed that it follows all the standard UI conventions
	- Error Prevention: So as the user does not enter invalid values in the Date fields for the "Uploaded Since" and "Uploaded Untill" input box, a date-picker element is provided that helps the user enter valid inputs.
	- Recognition and Recall: The UI is very simple for navigation so that it is convenient for the user to use it without any issues.
	- Aesthetic and Minimalistic Design: The UI design is kept simple and Aesthetic with relevant information.
	- Helping users recognize, diagnose and recover from errors: The error messages help serve the purpose.
	- Help and Documentation: This README is provided giving proper instructions for installation and use of the application.

Instructions for Use
---------------------
1) The user can search a query for retrieving photos, as the application implements Flickr APPI.
2) The user can give the following combinations of inputs and thier respective results are obtained:
	1. No inputs at all (All fields blank) - An error message will be displayed=> "Invalid Inputs"
	2. Only the search query 
		- The results for the given search query if available
		- or an error message saying "No Results found! Try again" if no results are found
		- or an error message saying "Invalid Inputs" if an invalid query is entered
	3. Only the user name:
		- The results for the given user if available
		- Or an error message saying "No Results found! Try again" if no results are found
		- Or an error message saying "Invalid Username" if user is not found
	4. Only the date fields:
	 	- or an error message saying "Invalid Inputs".
	5. All valid fields: 
		- The page is redirected to the results page.
3) On the results page the user can view all the results that are obtained for the given search query and conditions.
4) On loading the page for the first time, if shows 10 results, but when scrolled to the end of the page, another button is visible saying "Load More Images".
5) This appends to the page next 10 results, and so on.
6) The button becomes disabaled when all the results for the given search query is returned, and the message on the button changes to "No more images to load".
7) On clicking on the image, a bigger version of it is opened in the browser window.
8) A "Link to User Profile" is added to visit the users profile to whom the photo belongs.
7) By clicking on the application name the user is redirected to the home page.

References
------------
- Convert javascript date to mysql date format
http://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime

- Datepicker
http://jqueryui.com/datepicker/

- Bootstrap Theme ideas
http://bootstraptaste.com/
