'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 options.tableName = 'SpotImages';
 await queryInterface.bulkInsert(options, [
   {
     spotId: 1,
     url: 'exampleurl1.com',
     preview: true
   },
  {
    spotId: 2,
    url: 'exampleurl2.com',
    preview: true
  },
  {
    spotId: 3,
    url: 'exampleurl3.com',
    preview: true
  },

 ])
  },

  async down (queryInterface, Sequelize) {
  
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options.tableName, null, {})
  }
};
