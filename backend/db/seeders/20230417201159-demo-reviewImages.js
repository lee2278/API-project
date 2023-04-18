'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'example1.com'
      },
      {
        reviewId: 2,
        url: 'example2.com'
      },
      {
        reviewId: 1,
        url: 'example3.com'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
   
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options.tableName, null, {})
  }
};
