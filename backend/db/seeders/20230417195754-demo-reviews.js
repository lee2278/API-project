'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   options.tableName = 'Reviews';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 2,
      review: 'Very clean, nice amenities.',
      stars: 5,
    },
    {
      spotId: 1,
      userId: 3,
      review: 'Stay was pleasant.',
      stars: 4
    },
    {
      spotId:2,
      userId: 2,
      review: 'Location was great. Close to tourist attractions.',
      stars: 5
    },
    {
      spotId:2,
      userId: 3,
      review: 'Stay was ok. Not bad',
      stars: 3
    },
    {
      spotId:3,
      userId: 1,
      review: 'Had a good time. Everything well provided.',
      stars: 5
    },
    {
      spotId:4,
      userId: 1,
      review: 'Nice home decor. Amenities were clean.',
      stars: 4
    },
    {
      spotId:6,
      userId: 1,
      review: 'Great view of Sedona. Would book again next time I visit.',
      stars: 5
    },
    {
      spotId:6,
      userId: 2,
      review: 'Pricing was a little high, but the views at this location were great!',
      stars: 4
    },
    {
      spotId:12,
      userId: 1,
      review: 'It was ok. Right by the ocean, but way too expensive per night',
      stars: 3
    },
    {
      spotId:14,
      userId: 2,
      review: 'Nice place and convenient',
      stars: 4
    },
    {
      spotId:14,
      userId: 4,
      review: 'Stay was ok. Ran into some issues with the door lock when checking in',
      stars: 3
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, null, {})
  }
};
