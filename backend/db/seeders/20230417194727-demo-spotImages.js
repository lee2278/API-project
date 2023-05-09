'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'url preview',
        preview: true
      },
      {
        spotId: 1,
        url: 'url non-preview 1',
        preview: false
      },
      {
        spotId: 1,
        url: 'url non-preview 2',
        preview: false
      },
      {
        spotId: 1,
        url: 'url non-preview 3',
        preview: false
      },
      {
        spotId: 1,
        url: 'url non-preview 4',
        preview: false
      },
      {
        spotId: 2,
        url: 'url preview',
        preview: true
      },
      {
        spotId: 3,
        url: 'url preview',
        preview: true
      },
  
    ])
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {})
  }
};
