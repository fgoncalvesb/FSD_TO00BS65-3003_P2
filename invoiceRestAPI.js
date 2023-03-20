
var express = require("express");
var app = express();
var mongoose = require("mongoose");

// this is needed to read forms
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Mongo DB connection address
var uri = "mongodb+srv://kundogb:cgNEW0EEnvbPRGP5@cluster0.dfuhg0v.mongodb.net/?retryWrites=true&w=majority";

// Make schema to your data model
const Movie = mongoose.model(
"Movie",
{
    title: {
        type: String,
        required: true,
        },
    year: {
        type: Date,
        min: "1900-01-01",
        max: "2024-01-01",
        required: true
        },
    poster: {
        type: String,
        required: true,
        },
},
"movies"
);

// print out 20 movies
app.get("/api/getall", function(req, res) 
{

getMovies().catch(err => res.status(500).send(err));

    async function getMovies() {

        await mongoose.connect(uri);
      
        // New version of mongoose does not accept calback functions inside functions, so you have to wrap those inside an async function
        const result = await Movie.find({}, null, {limit:20})
   
        res.status(200).json(result);
        
      }

});

// Add one more movie – notice POST-variable reading
app.post("/api/add", function(req, res) {
    
    addMoviee().catch(err => res.status(500).send(err));

    async function addMoviee() {

        await mongoose.connect(uri);

                // new object for saving
                var newMovie = new Movie({
                    title: req.body.title,
                    year: req.body.year,
                    poster: req.body.poster
                });
        
        var newMovieVal = newMovie.validateSync();
      
        if (newMovieVal == null || newMovieVal == ""){

            newMovie.save();

            res.status(200).send('{"message": "Movie added correctly" ,"response:"'+ JSON.stringify(result) + '}');

        } else {

            res.status(500).send(newMovieVal);

        }
     

      }
    
    });

    // Return one item with the given id
app.get("/api/:id", function(req, res) {

        // pick ID from parameter in URL
        var id = req.params.id;

        getSpecificMovie().catch(err => res.status(500).send(err));

        async function getSpecificMovie() {

            await mongoose.connect(uri);
            
            // New version of mongoose does not accept calback functions inside functions, so you have to wrap those inside an async function
            const result = await Movie.findById(id);
            
            if (result == null || result == ""){

                res.status(500).send('{"message": "Movie with that ID is not found" ,"response:"'+ JSON.stringify(result) + '}');
    
            } else {
                res.status(200).send(result);
            }
            
        }
});

    // Update the document with the given id
app.put("/api/update/:id", function(req, res) {

        // pick ID from parameter in URL
        var id = req.params.id;

        updateMovie().catch(err => res.status(500).send(err));

        async function updateMovie() {

            await mongoose.connect(uri);

            // object to validate
            var validMovie = new Movie({
                title: req.body.title,
                year: req.body.year,
                poster: req.body.poster
            });


    
                const result = await Movie.updateOne({ _id: id }, req.body, { runValidators: true } );

                console.log(result);

                    if (result.matchedCount == 0){

                        res.status(200).send('{"message": "Movie with that ID is not found" ,"response:"'+ JSON.stringify(result) + '}');
            
                    } else if (result.acknowledged == true) {
                        
                        res.status(200).send('{"message": "Movie updated correctly" ,"response:"'+ JSON.stringify(result) + '}');

                    } else {

                        res.status(200).send(result);

                    }
    
        }

});

// Delete the item with the given id
app.delete("/api/delete/:id", function(req, res) {
        
        // pick ID from parameter in URL
        var id = req.params.id;

        deleteMovie().catch(err => res.status(500).send(err));

        async function deleteMovie() {

            await mongoose.connect(uri);
            
            // New version of mongoose does not accept calback functions inside functions, so you have to wrap those inside an async function
            const result = await Movie.findByIdAndRemove(id);

            if (result == null || result == ""){

                res.status(500).send('{"message": "Movie can\'t be deleted as there is none with that ID" ,"response:"'+ JSON.stringify(result) + '}');
    
            } else {
                res.status(200).send('{"message": "Movie deleted correctly" ,"response:"'+ JSON.stringify(result) + '}');
            }
        
        }

});

//The 404 Route (Always kepe this as the last route)
app.get('*', function (req, res){
    res.status(404).send('Cant find the requested page');
});

app.listen(8080, function (){
    console.log('API-Rest listing on port 8080!')
});