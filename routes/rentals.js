const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');   
const Fawn = require('fawn'); // This is a class
const express = require('express');
const router = express.Router(); 

Fawn.init('mongodb://127.0.0.1:27017/vidly')

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try{ 
        const task =new Fawn.Task() 
        task.save('rentals', rental) 
            .update('movies', {_id: movie.id}, {
                $inc: { numberInStock: -1}
            }) 
            .run(); // need to call this to run above methods 
        
        res.send(rental);

    }catch(ex){
        console.log(`Faw Error: ${ex}`)
        res.status(500).send('Something failed.')
    }
    
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID was not found.');

    res.send(rental);
});

module.exports = router;   


// _id: 5a724953ab83547957541e6a 
// 24 characters ( 12 bytes) 
   // 4 bytes: timestamp 
   // 3 bytes: machine identifieer 
   // 2 bytes: process identifier 
   // 3 bytes: counter

// ENDPOINTS
// Register: POST /api/users 
// Login: POST /api/logins 
