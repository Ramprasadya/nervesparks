const express = require('express');
const app = express()
const router = express.Router();
const Car = require('../model/Cars')
const Dealership = require('../model/Dealership')
const Deal = require('../model/Deal')


const bodyParser = require('body-parser');


// Set up body-parser middleware to parse request bodies
app.use(bodyParser.json());


// Endpoint to view all cars
router.get('/cars', async (req, res) => {
    try {
      const cars = await Car.find();
      res.json(cars);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch cars.' });
    }
  });

  
// Endpoint to view all cars in a dealership
router.get('/dealerships/:dealershipId/cars', async (req, res) => {
    try {
      const { dealershipId } = req.params;
      const cars = await Car.find({ dealership: dealershipId });
      res.json(cars);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch cars in the dealership.' });
    }
  });
  
  // Endpoint to view dealerships with a certain car
  router.get('/cars/:carId/dealerships', async (req, res) => {
    try {
      const { carId } = req.params;
      const dealerships = await Dealership.find({ cars: carId });
      res.json(dealerships);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch dealerships with the car.' });
    }
  });
  
  // Endpoint to view all vehicles owned by the user
  router.get('/users/:userId/vehicles', async (req, res) => {
    try {
      const { userId } = req.params;
      const vehicles = await Car.find({ owner: userId });
      res.json(vehicles);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch vehicles owned by the user.' });
    }
  });
  
  // Endpoint to view dealerships within a certain range based on user location (use maps API)
  router.get('/dealerships/:latitude/:longitude/range', async (req, res) => {
    try {
      // Implement the logic to fetch dealerships within a certain range based on user location
      // You can use a maps API to calculate distances
      // ...
      res.json(dealershipsInRange);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch dealerships within the range.' });
    }
  });
  
  // Endpoint to view all deals on a certain car
  router.get('/cars/:carId/deals', async (req, res) => {
    try {
      const { carId } = req.params;
      const deals = await Deal.find({ car: carId });
      res.json(deals);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch deals on the car.' });
    }
  });
  
  // Endpoint to view all deals from a certain dealership
  router.get('/dealerships/:dealershipId/deals', async (req, res) => {
    try {
      const { dealershipId } = req.params;
      const deals = await Deal.find({ dealership: dealershipId });
      res.json(deals);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch deals from the dealership.' });
    }
  });
  
  // Endpoint to allow the user to buy a car after a deal is made
  router.post('/deals/:dealId/buy', async (req, res) => {
    try {
      const { dealId } = req.params;
      const deal = await Deal.findById(dealId);
  
      if (!deal) {
        return res.status(404).json({ error: 'Deal not found.' });
      }
  
      // Implement logic to handle the car purchase, update car ownership, etc.
      // ...
  
      res.json({ message: 'Car purchased successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Unable to complete the car purchase.' });
    }
  });

  // Endpoint to add cars to the dealership
router.post('/dealerships/:dealershipId/cars', async (req, res) => {
  try {
    const { dealershipId } = req.params;
    const { carData } = req.body;

    // Create a new car with the given carData
    const newCar = new Car({
      dealership: dealershipId,
      ...carData,
    });

    await newCar.save();

    res.json(newCar);
  } catch (err) {
    res.status(500).json({ error: 'Unable to add cars to the dealership.' });
  }
});

// Endpoint to view deals provided by the dealership
app.get('/api/dealerships/:dealershipId/deals', async (req, res) => {
  try {
    const { dealershipId } = req.params;
    const deals = await Deal.find({ dealership: dealershipId });
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch deals provided by the dealership.' });
  }
});

// Endpoint to add deals to the dealership
app.post('/api/dealerships/:dealershipId/deals', async (req, res) => {
  try {
    const { dealershipId } = req.params;
    const { dealData } = req.body;

    // Create a new deal with the given dealData
    const newDeal = new Deal({
      dealership: dealershipId,
      ...dealData,
    });

    await newDeal.save();

    res.json(newDeal);
  } catch (err) {
    res.status(500).json({ error: 'Unable to add deals to the dealership.' });
  }
});

// Endpoint to view all vehicles the dealership has sold
app.get('/api/dealerships/:dealershipId/sold-vehicles', async (req, res) => {
  try {
    const { dealershipId } = req.params;
    const deals = await Deal.find({ dealership: dealershipId });

    // Extract sold vehicle IDs from the deals
    const soldVehicleIds = deals.map((deal) => deal.car);

    // Fetch the sold vehicles using the IDs
    const soldVehicles = await Car.find({ _id: { $in: soldVehicleIds } });

    res.json(soldVehicles);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch sold vehicles.' });
  }
});

// Endpoint to add a new vehicle to the list of sold vehicles after a deal is made
app.post('/api/deals/:dealId/sell-vehicle', async (req, res) => {
  try {
    const { dealId } = req.params;
    const deal = await Deal.findById(dealId);

    if (!deal) {
      return res.status(404).json({ error: 'Deal not found.' });
    }

    // Get the car ID from the deal
    const carId = deal.car;

    // Fetch the car details
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ error: 'Car not found.' });
    }

    // Set the car's owner to the buyer's ID (Assuming you have a buyer field in the dealData)
    car.owner = deal.buyer;

    // Save the updated car
    await car.save();

    res.json({ message: 'Vehicle sold successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to complete the vehicle sale.' });
  }
});
  
  
  
  





  module.exports = router