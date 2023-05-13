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
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, null, {})
  }
};
