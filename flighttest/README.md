Flight Control System

Group: 2
Number of group members: 3
Name: Lee Brian (12623187), Zhu Jiawei (12627010), Xu Xiaochi (12556828)
MongoDB Database name: comps381-project

Application link: 

********************************************
System functions list:
        1. Login/ Logout
        2. Creation of new flight object
        3. Read details from existing flight objects
        4. Remove flight objects
        5. Search flight objects by one or more out of the following attributes: flight number, airline, destination, status (check in, take off, arrival)
        6. Search flight objects by MongoDB query command
        7. RESTful service: 
            1. Search by flight number: /api/flights/flightnumber/:flightnumber
            2. Search by airline: /api/flights/airline/:airline
            3. Search by destination: /api/flights/destination/:destination
            4. Search by status: /api/flights/status/:status

In the cover of the homepage, the page should display "Welcome to Flight Control System", and underneath that, users can log in/out with their credentials..
********************************************
# Login
For the login interface, each user can access the content of the Flight Control System with their own registered usernames and passwords.

The user id, i.e. the "name", is stored after successful login using credentials.

Guidelines for login trials:
Login information:
If a user leave the username and password sections blank, which mean an empty string "" exist, indicating no password required for that particular account.
The password must be at least 8 characters long, including at least 1 number and 1 upper-case letter in the string.
Password: "" means that account has no password.
        1. {name: "brianlee", password: "brianLEE1011"},
		2. {name: "jiaweizhu", password: "jiaweiZHU0308"},
		3. {name: "chuckxu", password: "chuckXU0610"},
        4. {name: "elviszhao", password: "elvisZHAO1006"},
    	5. {name: "nikochen", password: "nikoCHEN0610"},
    	5. {name: "micklee", password: "mickLEE0429"}

Testings for login/logout:
Reminder: username and passwords are both case sensitive, 
    1. Login the system by using the following, for example: 
		Username: brianlee 
        Password: brianLEE1011
	2. The information of the users will be stored into session.
	3. The page will now display a UI with two options: Create Flight and View Flight.
	4. Click the 'Log out' button to log out
	5. Navigate on 'Logout' button for logging out of the page
	6. The system will redirect users back to the login page.

	Repeat the above steps for logging into other accounts with other registered usernames and passwords

********************************************
# CRUD service
- Create
-	A flight object may contain the following attributes with an example: 
	1) Flight Number: each flight will be assigned a flight number. The flight number consists of a mixture of letters and numbers, and stored in string format, spaces are allowed between characters, e.g. BA 240
	2) Airline: each flight will be assigned to an airline. The airline contains letters only, with at least 1 capital letter and is stored in string format, no restriction in number of characters, spaces are allowed between characters, e.g. Cathay Pacific
	3) Destination: each flight will be flown to a destination. The destination contains letters only, with at least 1 capital letter and is stored in string format, no restriction in number of characters, spaces are allowed between characters, e.g. Japan
	4) Status: each flight will have its own status: check in, arrival, take off. Spaces are allowed between characters. Status is stored in string format.

	1. Click on 'Create Flight' button.
	2. The page will be redirected to the 'Create Flight' page
	2. Fill in the details of the flight object, e.g. Flight Number, Airline, Destination, Status
	3. Click 'Create' to create the flight object
	4. Click on 'View Flight' button
	5. The page will be redirected to the 'View Flight' page
	4. The 'View Flight' page should show that a new flight object is created.

Flight Number, Airline and Destination are mandatory.
Status is optional.

Create operation is post request, and all information is in body of request.

********************************************
# CRUD service
- Update

Show all the details, grouped by their aircraft registration id and company id
	1. navigate to the corresponding flight object to obtain details of the flight.
	3. Click 'Update' to update the airplane information for the corresponding flight object.
	4. Change the flight number from 'CX231' to 'CX232'
	5. Click 'Home' button
	6. The 'View Flight' page should shown the updated object
	
Remark: To update the details of other flights, just repeat the above steps.

********************************************
# CRUD service
- Delete
1. Click on the corresponding flight object to obtain details of the flight.
2. Click 'Delete' to delete this flight object
3. Click 'Home' button
4. The associated flight information should be removed from the 'View Flight' page.

********************************************

# CRUD service
- Search
1. Click on the corresponding flight object
2. Search flight objects by using one or more out of the following attributes: flight number, airline, destination, status (check in, take off, arrival)
3. Click 'Search' to search this flight object
4. The flight information will be filtered based on the query criteria specified in the search bar, only showing the relevant flight objects.
5. Return to homepage by clicking 'Home' or continue searching for other flight objects by editing the search bar.
********************************************
# Restful
Note: RESTful services is case-sensitive, must be login to the system first with any valid account then use the services.

For HTTP request types, there are three types that are to be tested: post, get and delete.

- Post 
	Post request is used for insert.
	Example: Path URL: /api/flights/flightnumber/:flightnumber
	Test: curl -X POST -H "Content-Type: application/json" --data '{"name": Cathay Pacific, "flightnumber": "CX232"}'localhost:3000/api/item/flightnumber/CX232/.
	Successful insertion will be displayed if the post request testing is successful. The list of flight objects in the 'View Flight' page will be updated, with the associated flight objects removed from the RESTFUL POST test.

RESTful services test:

        Note: RESTful services is case-sensitive
        Note: Must be login to the system first with any valid account then use the services

        RESTful searching services access by the following:
        	1. Search by flight number: /api/flights/flightnumber/:flightnumber
            2. Search by airline: /api/flights/airline/:airline
            3. Search by destination: /api/flights/destination/:destination
            4. Search by status: /api/flights/status/:status

            Search by Flight Number:
                1. Copy and past the Search by name pathURL 'https://comps381f-project.render.com/api/flights/flightnumber'
                2. The system will redirect to RESTful Search Result page and show the result.
				3. Select the flight object that correponds to the flight number you want.
                4. Click 'Home' button return to homepage or search other object with different flight numbers.
            
            Search by Airline:
                1. Copy and past the Search by name pathURL 'https://comps381f-project.render.com/api/flights/airline'
                2. The system will redirect to RESTful Search Result page and show the result.
				3. Select the flight object that correponds to the airline you want.
                4. Click 'Home' button return to homepage or search other object with different airlines.

			Search by Destination:
                1. Copy and past the Search by name pathURL 'https://comps381f-project.render.com/api/flights/destination'
                2. The system will redirect to RESTful Search Result page and show the result.
				3. Select the flight object that correponds to the destination you want.
                4. Click 'Home' button return to homepage or search other object with different destinations.

			Search by Status:
                1. Copy and past the Search by name pathURL 'https://comps381f-project.render.com/api/flights/status'
                2. The system will redirect to RESTful Search Result page and show the result.
				3. Select the flight object that correponds to the associated status.
                4. Click 'Home' button return to homepage or search other object with the other status.

        	Search document(s) via MongoDB query command:
        	Note: Search document(s) via MongoDB query command is not case-sensitive
			
			Search filtering will be performed basedThe list of flight objects in the 'View Flight' page will be updated, filtering only the relevant flight objects that fulfill the query criteria based on the RESTFUL GET test.

- Delete
	Delete request is used for deletion.
	Example: Path URL: /api/flights/destination/:destination
	Test: curl -X DELETE localhost:3000/api/flights/destination/Japan.
	Successful deletion will be performed. The list of flight objects in the 'View Flight' page will be updated, with the associated flight objects removed from the RESTFUL Delete test.
***************************************************************
END
