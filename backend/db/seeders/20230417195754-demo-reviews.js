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
      review: 'Very clean, nice amenities.',
      stars: 5,
    },
    {
      review: 'Stay was pleasant.',
      stars: 4
    },
    {
      review: 'Location was great. Close to tourist attractions.',
      stars: 5
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options.tableName, null, {})
  }
};
