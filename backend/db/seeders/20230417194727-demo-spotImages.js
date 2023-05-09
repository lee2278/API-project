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
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/8ff2a532-e0cd-41a2-9164-554c4d9eb28a.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/7da9fd6a-8d6c-4954-88b0-1fc52abc9cfd.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/41cbfe4c-56b1-4a67-8365-47a5894816a4.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/5bf7252a-1b94-4a85-aa3b-581c16d6bd69.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/9fa8d9d8-3136-4634-8769-3896efef8e11.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-23206143/original/e7da1f36-922f-4631-a287-91ceda05970f.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-23206143/original/e80ace7e-c494-49b9-9595-08ab76ef4365.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-23206143/original/55b0263c-756d-466b-b050-39b031398a1d.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-23206143/original/b779ec9c-080a-4788-9391-512f7d247aa0.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-23206143/original/60b99416-8264-4a29-b486-cd6721117423.jpeg',
        preview: false
      }
    ])
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {})
  }
};
