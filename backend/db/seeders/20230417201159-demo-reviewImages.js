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
        url: 'image url'
      },
      {
        reviewId: 2,
        url: 'image url'
      },
      {
        reviewId: 1,
        url: 'image url'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
   
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options, null, {})
  }
};
