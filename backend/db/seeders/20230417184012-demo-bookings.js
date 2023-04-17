'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        startDate: '2023-01-01',
        endDate: '2023-01-10'
      },
      {
        startDate: '2023-02-01',
        endDate: '2023-02-10'
      },
      {
        startDate: '2023-03-01',
        endDate: '2023-03-10'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options.tableName, null, {})
  }
};
