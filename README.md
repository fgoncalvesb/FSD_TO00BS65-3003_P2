# TO00BS65-3003_Projects

This is a repository for project 2 of the Full Stack Development Laurea course

Project 2: API Rest
By Facundo Goncalves Borrega

## Render URL

- https://full-stack-ope-fgb-p2.onrender.com

---

## Application description

It's a REST API that let's you create invoices, delete them, update them, query in order to get at least 20 of them without a filter and to get one specific invoice by ID.

Important: maybe the first time you call the API, you will have to wait some minutes for the API to wake "up", as I used free Render account. After that first time, the response is quicker.

GET https://full-stack-ope-fgb-p2.onrender.com/api/getall Returns all invoices in collection - Returnos all (max 20) documents in the collcetion, in an array.

- If collection is empty, it will return an empty json

GET https://full-stack-ope-fgb-p2.onrender.com/api/:id Returns one invoice with the given id

- If ID exists, will return the document
- If ObjectId does not have correct format, the repsonse of the DB will be shown in a json
- If ObjectId format is correct but does not match a document ID, response json will be {"message": "Invoice with that ID is not found"} and the DB response, which will probably be null.

POST https://full-stack-ope-fgb-p2.onrender.com/api/add Creates a new invoice in the collection

-If correct: {"message": "Invoice added correctly" ,"response:"{}}
-"reponse" is empty because the DB returns nothing if the invoice was properly created
-If validation is not passed, JSON with detail will be returned

Restrictions in order to create a new invoice:

    invoicenumber: {
        type: String,
        required: true,
        },
    emissiondate: {
        type: Date,
        min: "2020-01-01",
        max: "2023-12-31",
        required: true
        },
    amount: {
        type: Number,
        required: true,
        }

PUT https://full-stack-ope-fgb-p2.onrender.com/api/update/:id Updates the invoice with the given id. It tries to update only the part that you put in the json and just for that invoice.

- If ID is correct, the response will be {"message": "Invoice updated correctly"} together with the DB response, which will probably be "dbresponse:"{"acknowledged":true,"modifiedCount":1,"upsertedId":null,"upsertedCount":0,"matchedCount":1}
- If field to be updated does not pass a field validation, corresponding error with detail of the validation will be shown (the same validations as when you add an invoice)
- If ObjectId does not have correct format, the repsonse of the DB will be shown in a json
- If ObjectId format is correct but does not match a document ID, response json will be {"message": "Invoice with that ID is not found"} and the DB response.

DELETE https://full-stack-ope-fgb-p2.onrender.com/api/delete/:id Deletes the invoice with the given id and if it was successfull, will show you which invoice it deleted.

- If ID is correct, the response will be {"message": "Invoice deleted correctly"} together with the DB response, which will probably be the document removed.
- If ObjectId does not have correct format, the repsonse of the DB will be shown in a json
- If ObjectId format is correct but does not match a document ID, response json will be {"message": "Invoice with that ID is not found"} and the DB response.

## Criteria for assignemnt

https://raw.githubusercontent.com/jukmali/Full-Stack-Master/main/projects/project_2.pdf
