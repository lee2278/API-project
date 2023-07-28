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
        spotId: 1,
        userId: 3,
        startDate: new Date ('2022-05-07'),
        endDate: new Date('2022-05-14')
      },
      {
        spotId: 1,
        userId: 2,
        startDate: new Date ('2023-01-01'),
        endDate: new Date('2023-01-10')
      },
      {
        spotId: 1,
        userId: 4,
        startDate: new Date ('2024-01-01'),
        endDate: new Date('2024-01-07')
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date ('2021-07-28'),
        endDate: new Date('2021-08-05')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date ('2023-07-01'),
        endDate: new Date('2023-07-05')
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date ('2023-06-02'),
        endDate: new Date('2023-06-10')
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date ('2023-05-25'),
        endDate: new Date('2023-05-28')
      },
      {
        spotId: 6,
        userId: 1,
        startDate: new Date ('2023-04-20'),
        endDate: new Date('2023-04-25')
      },
      {
        spotId: 6,
        userId: 2,
        startDate: new Date ('2022-10-21'),
        endDate: new Date('2022-10-26')
      },
      {
        spotId: 12,
        userId: 1,
        startDate: new Date ('2022-09-15'),
        endDate: new Date('2022-09-17')
      },
      {
        spotId: 14,
        userId: 2,
        startDate: new Date ('2023-05-01'),
        endDate: new Date('2023-05-10')
      },
      {
        spotId: 14,
        userId: 4,
        startDate: new Date ('2023-03-15'),
        endDate: new Date('2023-03-20')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date ('2024-03-15'),
        endDate: new Date('2024-03-20')
      },
      {
        spotId: 1,
        userId: 2,
        startDate: new Date ('2023-12-25'),
        endDate: new Date('2024-01-10')
      },
      {
        spotId: 8,
        userId: 1,
        startDate: new Date ('2024-03-25'),
        endDate: new Date('2024-03-28')
      },
      {
        spotId: 11,
        userId: 1,
        startDate: new Date ('2024-05-25'),
        endDate: new Date('2024-06-01')
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, null, {})
  }
};
