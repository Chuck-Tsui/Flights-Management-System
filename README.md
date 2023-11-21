Airplane Information Management System

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
        5. Search flight objects by company name, company id, aircraft registration name, aircraft registration id
        6. Search flight objects by MongoDB query command
        7. RESTful service: 
            1. Search by company name: /api/flights/:companyname
            2. Search by type: /api/flights/:typename
            3. Search by aircraft manufactured company: /api/flights/:manufacturedcompany
            4. Search by company id: /api/flights/:companyid
			5. Search by aircraft registration id: /api/flights/:aircraftregistrationid

In the cover of the homepage, the page should display "Welcome to Airplane Management System", and underneath that, users can choose different buttons to perform various crud operations, such as search, update, read and remove information, e.g. flight objects and user credentials etc, as well as login/logout.
********************************************
# Login
For the login inteface, each user can access the content of the airplane information system with their own registered usernames and passwords.

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
    2. 'User: brianlee' should be shown on the top of the page
	3. Click the 'Log out' button to log out
	3. Navigate on 'Logout' button for logging out of the page
	4. The system will redirect users back to the login page.
	5. Login the system by using the following : Username: brianlee, no need to input password.
	6. Click "Login" button
	7. 'User: jiaweizhu' should be shown on the top of the page
	8. Click the 'Log out' button to log out
	9. System will redirect back to the login page

	Repeat the above steps for logging into other accounts with other usernames and passwords

********************************************
# CRUD service
- Create
-	A flight object may contain the following attributes with an example: 
	1)	Company Name: company name must be at least 6 characters long and stored in string format
	2)	Company ID: company ID must be exactly 5-digits (e.g. 12345), and stored in string format
	3)	Aircraft Registration Name: must be at least 6 characters long, and stored in string format
	4)	Aircraft Registration ID: Aircraft Registration ID must be exactly 5-digits (e.g. 12345), and stored in string format
	5)  Tail number: must be between 2-6 characters long, with mixture of letters and numbers, and stored in string format
	6)	Type name: type name can consist of letters and numbers, and stored in string format, no restriction in number of characters
	7)	Type id: type ID must be exactly 5-digits (e.g. 12345), and stored in string format
	8) 	Manufactured year: must be exactly 4-digits, stored in integer format.
	9) 	Manufactured company: can only consist of letters, and stored in string format, no restriction in number of characters
	10) Description: can only consist of letters, and stored in string format, no restriction in number of characters
	11) Total kilometers flied: stored in floating point format, calculated by speed (km/h) multiply by time (hours)
	- The information for total kilometers flied is stored in the file TotalDistanceFlied.js (with reference to COMPS381F lab04 exercise)
	12) Meals provided: boolean: true/false/null

- Create
- A flight object consist of the attributes as shown below:
Company name, company ID, aircraft registration name, aircraft registration id, tail number, type name, type id, manufactured year, manufactured company, total kilometers flied are mandatory.
Description and meals provided are optional.

Create operation is post request, and all information is in body of request.

********************************************
# CRUD service

Show all the details, grouped by their aircraft registration id and company id
	1. Click on the aircraft registation id or company id that you want.
	2. Click on the corresponding flight object to obtain details of the flight
	3. The system will redirect to the details page, 'Edit', 'Delete' and 'Back to home' button should shown on the bottom of the page.
	4. Click 'back to home' back to the homepage

********************************************
# CRUD service
- Update
-	The user can update the restaurant information through the details interface.
-	Among the attribute shown above, Restaurant ID cannot be changed.
	Since both the registration id and company id remain unchanged, both attributes are the main searching measures for updating information. 

Show all the details, grouped by their aircraft registration id and company id
	1. Click on the aircraft registation id or company id that you want.
	2. Click on the corresponding flight object to obtain details of the flight
	3. The system will redirect to the details page, 'Edit', 'Delete' and 'Back to home' button should shown on the bottom of the page.
	4. Click on 'Edit' to edit the details of the object.
	5. Click 'Update' to update the airplane information
	6. Change the flight number from 'CX231' to 'CX232'
	7. Click 'Back to home' button
	8. The homepage should shown the updated object
	9. Click 'back to home' back to the homepage
	
Remark: To update the details of other flights, just rrepeat the above steps.

********************************************
# CRUD service
- Delete
1. Click on the corresponding flight object
2. Click 'Delete' to delete this flight object
3. Click 'Back to home' button
4. The flight object should be removed from the homepage
********************************************
# Restful
 Note: RESTful services is case-sensitive, must be login to the system first with any valid account then use the services

RESTful services test:

        Note: RESTful services is case-sensitive
        Note: Must be login to the system first with any valid account then use the services

        RESTful services access by the following:
        1. Search by company name: /api/flights/:companyname
        2. Search by type: /api/flights/:typename
        3. Search by aircraft manufactured company: /api/flights/:manufacturedcompany
        4. Search by company id: /api/flights/:companyid
		5. Search by aircraft registration id: /api/flights/:aircraftregistrationid

            Search by name:
                1. Copy and past the Search by name pathURL 'https://comps381f-project.render.com/api/flights/companyname'
                2. The system will redirect to RESTful Search Result page and show the result
                3. Copy and past the Search by name pathURL 'https://s381f-project-inventory-system.herokuapp.com/api/inventory/name/Compass'
                4. The system will redirect to RESTful Search Result page and show the result
                5. Click 'Back to home' button return to homepage or search other object via this service with different value
            
            Search by type:
                1. Copy and past the Search by name pathURL 'https://comps381f-project.render.com/api/flights/type'
                2. The system will redirect to RESTful Search Result page and show the result
                3. Copy and past the Search by name pathURL 'https://comps381f-project.render.com/api/flights/companyname'
                4. The system will redirect to RESTful Search Result page and show the result
                5. Click 'Back to home' button return to homepage or search other object via this service with different value

        Search document(s) via MongoDB query command:
        Note: Search document(s) via MongoDB query command is not case-sensitive

        Reminder:
        1. While using 'Operand' eg. '$and', 'or', make sure that all input boxes have been inputted.
        2. If all input boxes have been inputted except "operand", the system default to search with the values from "Field1" and "Value1".
        3. If 'Operand' and 'Field1' or 'Field2' have been inputted, the system default to search with one of the inputted field to search.
        4. While searching with one condition, just input the value into either "Field1"&"Value1" or "Field2"&"Value2".

***************************************************************
END