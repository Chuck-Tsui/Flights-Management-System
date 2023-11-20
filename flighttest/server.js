
const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');

const app = express();
const port = 3000;

const uri = "mongodb+srv://Chuckxu:11223344@cluster0.de3kqar.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
// MongoDB Atlas 连接字符串

let db;
client.connect().then(() => {
  db = client.db('test');
  console.log("Connected successfully to MongoDB Atlas");


  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

}).catch(error => console.error('Error connecting to MongoDB:', error));


app.set('view engine', 'ejs');

//RESTful API Chuck Xu

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/create', function(req, res) {
    res.render('create');
});
//Read
app.get('/flights', async function(req, res) {
    try {
        const flights = await db.collection('flights').find({}).toArray();
        res.render('flights', { flights: flights }); // Render flights.ejs with flight data
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//update
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


app.get('/flights/update', async function(req, res) {
    try {
        const flights = await db.collection('flights').find({}).toArray();
        // Render a view that lists flights with an update option
        res.render('flights_update_list', { flights: flights });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





//create
// To create a new flight record
app.post('/create', async function(req, res) {
    // Extract flight data from request body
    const newFlight = {
        flightNumber: req.body.flightNumber,
        airline: req.body.airline,
        destination: req.body.destination,
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


//edit
app.get('/edit/:flightNumber', function(req, res) {
    const flightNumber = req.params.flightNumber;

    // 从数据库中查询航班
    FlightModel.findOne({ flightNumber: flightNumber }, function(err, flight) {
        if (err || !flight) {
            // 处理错误或航班不存在的情况
            res.status(404).send("未找到航班");
        } else {
            // 确保 'flight' 对象被传递到 'edit' 模板
            res.render('edit', { flight: flight });
        }
    });
});




//To get a list of flights or a specific flight:
// Get all flights
app.get('/api/flights', async function(req, res) {
    try {
        const flights = await db.collection('flights').find({}).toArray();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific flight by ID
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


//To update an existing flight
app.post('/api/flights/:id', async function(req, res) {
    const flightId = req.params.id;
    const updatedFlight = {
        flightNumber: req.body.flightNumber,
        airline: req.body.airline,
        destination: req.body.destination,
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
//Delete
// DELETE route for deleting a flight
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


