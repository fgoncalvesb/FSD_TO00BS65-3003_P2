
var express = require("express");
var app = express();
var mongoose = require("mongoose");

// This is needed to read the api calls
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Mongo DB connection address
var uri = "mongodb+srv://kundogb:cgNEW0EEnvbPRGP5@cluster0.dfuhg0v.mongodb.net/?retryWrites=true&w=majority";

// The schema to my data model
const Invoice = mongoose.model(
"Invoice",
{
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
        },
},
"invoices"
);

// print out invoices
app.get("/api/getall", function(req, res) 
{

// This is for catching and showing any posible errors in the async functions
getInvoices().catch(err => res.status(500).send(err));

    async function getInvoices() {

        await mongoose.connect(uri);
      
        // New version of mongoose does not accept calback functions inside functions, so you have to wrap those inside an async function
        const result = await Invoice.find({}, null, {limit:20})

        res.status(200).json(result);
        
      }

});

// Adds one new invoice
app.post("/api/add", function(req, res) {
    
    addInvoice().catch(err => res.status(500).send(err));

    async function addInvoice() {

        await mongoose.connect(uri);

                // new object for saving
                var newInvoice = new Invoice({
                    invoicenumber: req.body.invoicenumber,
                    emissiondate: req.body.emissiondate,
                    amount: req.body.amount
                });
        
        // Validates with my schema model
        var newInvoiceValidation = newInvoice.validateSync();

        console.log(newInvoiceValidation);
      
        // If validation is empty, it means it went ok. Otherwise, it went wrong.
        if (newInvoiceValidation == null || newInvoiceValidation == ""){

           var result = newInvoice.save();

            res.status(200).send('{"message": "Invoice added correctly" ,"dbresponse:"'+ JSON.stringify(result) + '}');

        } else {

            res.status(500).send(newInvoiceValidation);

        }
     

      }
    
    });

    // Return one invoice with the given id
app.get("/api/:id", function(req, res) {

        // pick ID from parameter in URL
        var id = req.params.id;

        getSpecificInvoice().catch(err => res.status(500).send(err));

        async function getSpecificInvoice() {

            await mongoose.connect(uri);
            
            // New version of mongoose does not accept calback functions inside functions, so you have to wrap those inside an async function
            const result = await Invoice.findById(id);
            
            // If the query returns empty o null, it means it hasn't found a document
            if (result == null || result == ""){

                res.status(500).send('{"message": "Invoice with that ID is not found" ,"dbresponse:"'+ JSON.stringify(result) + '}');
    
            } else {
                res.status(200).send(result);
            }
            
        }
});

    // Update the document with the given id
app.put("/api/update/:id", function(req, res) {

        // pick ID from parameter in URL
        var id = req.params.id;

        updateInvoice().catch(err => res.status(500).send(err));

        async function updateInvoice() {

            await mongoose.connect(uri);

                // The update is tried and also the field validations is run
                const result = await Invoice.updateOne({ _id: id }, req.body, { runValidators: true } );

                console.log(result);

                    // If no document is found with that ID, nothing is updated
                    if (result.matchedCount == 0){

                        res.status(200).send('{"message": "Invoice with that ID is not found" ,"dbresponse:"'+ JSON.stringify(result) + '}');
            
                    // If a document is found and also the acknowledged == true, which means that everything went OK, we display a JSON with the corresponding messages
                    } else if (result.acknowledged == true) {
                        
                        res.status(200).send('{"message": "Invoice updated correctly" ,"dbresponse:"'+ JSON.stringify(result) + '}');

                    } else {

                    // This is for other posible results if the query didn't go correctly
                        res.status(500).send(result);

                    }
    
        }

});

// Delete the item with the given id
app.delete("/api/delete/:id", function(req, res) {
        
        // pick ID from parameter in URL
        var id = req.params.id;

        deleteInvoice().catch(err => res.status(500).send(err));

        async function deleteInvoice() {

            await mongoose.connect(uri);
            
            // New version of mongoose does not accept calback functions inside functions, so you have to wrap those inside an async function
            const result = await Invoice.findByIdAndRemove(id);

            if (result == null || result == ""){

                res.status(500).send('{"message": "Invoice can\'t be deleted as there is none with that ID" ,"dbresponse:"'+ JSON.stringify(result) + '}');
    
            } else {
                res.status(200).send('{"message": "Invoice deleted correctly" ,"dbresponse:"'+ JSON.stringify(result) + '}');
            }
        
        }

});

//The 404 Route (This always has to be the last route)
app.get('*', function (req, res){
    res.status(404).send('Cant find the requested page');
});

app.listen(8080, function (){
    console.log('API-Rest listing on port 8080!')
});