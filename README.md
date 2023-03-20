# TO00BS65-3003_Projects
This is a repository for project 2 of the Full Stack Development Laurea course

Project 2: API Rest
By Facundo Goncalves Borrega

## Render URL
- https://full-stack-ope-fgb.onrender.com/

---

## Application description

It's a REST API that let's you create invoices, delete them, update them, query in order to get at least 20 of them without a filter and to get one specific invoice by ID.

GET http://myapp.com/api/getall Returns all invoices in collection

GET http://myapp.com/api/:id Returns one invoice with the given id

POST http://myapp.com/api/add Creates a new invoice in the collection
	If correct: {"message": "Invoice added correctly" ,"response:"{}}
		"reponse" is empty because the DB returns nothing if the invoice was properly created
		
	If validation is not passed, JSON with detail will be returned
	
	
PUT/PATCH http://myapp.com/api/update/:id Updates the invoice with the given id
DELETE http://myapp.com/api/delete/:id Deletes the invoice with the given id

## Criteria for assignemnt

https://raw.githubusercontent.com/jukmali/Full-Stack-Master/main/projects/project_2.pdf
