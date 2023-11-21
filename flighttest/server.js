const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');


const app = express();
const port = 3000;

//MongoDB URI
const uri = "mongodb+srv://Chuckxu:11223344@cluster0.de3kqar.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Static files setup
app.use(express.static('public'));


// Middleware for parsing request bodies
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Middleware for HTTP method override
app.use(methodOverride('_method'));


// Session configuration
app.use(session({
    secret: 'Airport', 
    resave: false,
    saveUninitialized: true
  }));
  

// Set view engine to EJS
app.set('view engine', 'ejs');


// User Credentials
var credentials = new Array(
    {name: "brianlee", password: "brianLEE1011"},
    {name: "jiaweizhu", password: "jiaweiZHU0308"},
    {name: "chuckxu", password: "chuckXU0610"},
    {name: "elviszhao", password: "elvisZHAO1006"},
    {name: "nikochen", password: "nikoCHEN0610"},
    {name: "micklee", password: "mickLEE0429"}
);


// Database connection
let db;
client.connect().then(() => {
  
  db = client.db('test');
  console.log("Connected successfully to MongoDB Atlas");

  

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

}).catch(error => console.error('Error connecting to MongoDB:', error));

//complete

//Login route
app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    
    const user = credentials.find(u => u.name === username && u.password === password);
    if (user) {
        
        req.session.user = user;
        res.redirect('/home');
    } else {
        
        res.send('login failed');
    }
});


//Route to display home page
app.get('/home', function(req, res) {
    res.render('home');
});


// Route for creating new flights
app.get('/create', function(req, res) {
    res.render('create');    
});


// Route for searching flights
app.get('/search', (req, res) => {
    res.render('search'); // 这将渲染 search.ejs 文件
});


// Route to retrieve all flights
app.get('/flights', async function(req, res) {
    try {
        const flights = await db.collection('flights').find({}).toArray();
        res.render('flights', { flights: flights }); // Render flights.ejs with flight data
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to edit a specific flight
app.get('/flights/edit/:id', async function(req, res) {
    const flightId = req.params.id;
    try {
        const flight = await db.collection('flights').findOne({ _id: ObjectId(flightId) });
        if (!flight) {
            return res.status(404).send('Flight not found');
        }
        res.render('update_flight', { flight: flight });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to update a flight
app.get('/flights/update', async function(req, res) {
    try {
        const flights = await db.collection('flights').find({}).toArray();
        // Render a view that lists flights with an update option
        res.render('flights_update_list', { flights: flights });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/search', async (req, res) => {
    try {

        const { flightNumber, airline, destination, status } = req.query;


        let query = {};
        if (flightNumber) query.flightNumber = flightNumber;
        if (airline) query.airline = airline;
        if (destination) query.destination = destination;
        if (status) query.status = status;


        const flights = await db.collection('flights').find(query).toArray();

        res.render('searchResults', { flights: flights });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).send('Error occurred during the search');
    }
});




// Route to handle flight creation
app.post('/create', async function(req, res) {
    // Extract flight data from request body
    const newFlight = {
        flightNumber: req.body.flightNumber,
        airline: req.body.airline,
        destination: req.body.destination,
        status: req.body.status,
        // Add other necessary fields
    };

    try {
        // Logic to insert newFlight into the database
        await db.collection('flights').insertOne(newFlight);

        // Instead of sending a JSON response, redirect to the flights list
        res.redirect('/flights');
    } catch (error) {
        // Handle any errors that occur during the insert
        res.status(500).json({ error: error.message });
    }
});


// Route to edit flight by flight number
app.get('/edit/:flightNumber', function(req, res) {
    const flightNumber = req.params.flightNumber;

    FlightModel.findOne({ flightNumber: flightNumber }, function(err, flight) {
        if (err || !flight) {

            res.status(404).send("faid to find the flight");
        } else {

            res.render('edit', { flight: flight });
        }
    });
});



// REST API routes

app.get('/api/flights', async function(req, res) {
    try {
        const flights = await db.collection('flights').find({}).toArray();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to get a specific flight by ID (API)
app.get('/api/flights/:id', async function(req, res) {
    const flightId = req.params.id;
    const updatedFlight = {
        flightNumber: req.body.flightNumber,
        airline: req.body.airline,
        destination: req.body.destination,
    };

    try {
        const result = await db.collection('flights').updateOne({ _id: new MongoClient.ObjectID(flightId) }, { $set: updatedFlight });
        if (result.matchedCount === 0) {
            return res.status(404).send('Flight not found');
        }
        res.status(200).json({ message: 'Flight updated successfully', flight: updatedFlight });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to update a flight (API)
app.post('/api/flights/:id', async function(req, res) {
    const flightId = req.params.id;
    const updatedFlight = {
        flightNumber: req.body.flightNumber,
        airline: req.body.airline,
        destination: req.body.destination,
        status: req.body.status,
        // Include other fields as necessary
    };

    try {
        const result = await db.collection('flights').updateOne({ _id: ObjectId(flightId) }, { $set: updatedFlight });
        if (result.matchedCount === 0) {
            return res.status(404).send('Flight not found');
        }
        // Redirect to the flight list or another suitable page after update
        res.redirect('/flights'); // Adjusted to redirect to the flights view page, not the API endpoint
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to delete a flight (API)
app.delete('/api/flights/:id', async function(req, res) {
    const flightId = req.params.id;
    try {
        const result = await db.collection('flights').deleteOne({ _id: ObjectId(flightId) });
        if (result.deletedCount === 0) {
            return res.status(404).send('Flight not found');
        }
        res.redirect('/flights'); // Redirect to the flights list
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Route for advanced flight search
app.get('/searchResults', async (req, res) => {
    try {
        const { flightNumber, airline, destination, status } = req.query;
        

        let query = {};
        if (flightNumber) query.flightNumber = new RegExp(flightNumber, 'i');
        if (airline) query.airline = new RegExp(airline, 'i');
        if (destination) query.destination = new RegExp(destination, 'i');
        if (status) query.status = new RegExp(status, 'i');


        const flights = await db.collection('flights').find(query).toArray();


        res.render('searchResults', { flights: flights });
    } catch (error) {
        console.error('Search error:', error);
        res.send('Error occurred during the search');
    }
});


