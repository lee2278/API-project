'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(
      options, [
      {
        id: 1,
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        id: 2,
        ownerId: 1,
        address: "321 Summer Lane",
        city: "Phoenix",
        state: "Arizona",
        country: "United States of America",
        lat: 33.448376,
        lng: -112.074036,
        name: "House Number Two",
        description: "A nice place to relax. House has a pool.",
        price: 200,
        createdAt: "2022-11-01 20:39:36",
        updatedAt: "2022-11-01 20:39:36"
      },
      {
        id: 3,
        ownerId: 2,
        address: "456 Rainy Lane",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat:  47.608013,
        lng: -122.335167,
        name: "House Number Three",
        description: "A condo by downtown close to the museums",
        price: 350,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        id: 4,
        ownerId: 2,
        address: "789 Spring Lane",
        city: "Columbus",
        state: "Ohio",
        country: "United States of America",
        lat:  40.001633,
        lng:  -83.019707,
        name: "House Number Four",
        description: "Nice little townhouse in a quiet neighborhood",
        price: 350,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },

    ]
    )
  },

  async down(queryInterface, Sequelize) {
    
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {})
    
  }
};
