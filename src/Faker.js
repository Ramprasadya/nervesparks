// npm install faker
 

import faker from 'faker';

// Function to generate dummy data for cars
function generateDummyCar() {
  return {
    brand: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    year: faker.vehicle.year(),
    price: faker.datatype.number({ min: 10000, max: 50000 }),
  };
}

// Function to generate dummy data for dealerships
function generateDummyDealership() {
  return {
    name: faker.company.companyName(),
    location: faker.address.city(),
  };
}

// Function to generate dummy data for deals
function generateDummyDeal() {
  return {
    car: generateDummyCar(),
    dealership: generateDummyDealership(),
    discount: faker.datatype.number({ min: 5, max: 25 }),
  };
}

// Generate and print some dummy data
console.log('Dummy Car:', generateDummyCar());
console.log('Dummy Dealership:', generateDummyDealership());
console.log('Dummy Deal:', generateDummyDeal());
