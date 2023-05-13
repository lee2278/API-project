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
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9fd.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/80e077fa-8985-483e-9946-8c088fbd8e78.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/a1cf4c19-a156-439d-bb5c-8d0e13544ed0.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/45b4ce4b-6bc9-4f19-af4b-811e6d2d8ef1.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/279e191e-784b-405f-9cfd-7ed9ce4010cf.jpeg',
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
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-13016398/original/6c59e24d-89f3-4475-aaca-80363792fb51.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-13016398/original/7629c923-3741-4ee8-9520-4685578aad4a.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-13016398/original/2161c70b-83ac-4ef8-83fd-8ff358fcbe2b.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-13016398/original/1e16174c-e9a6-4f2a-b20d-43e049cdd85d.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-13016398/original/60d17abb-e93a-446b-b3a1-740f0773d163.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635437605163910390/original/eaf8887f-410f-41e4-be1b-88c2a74fbfcf.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635437605163910390/original/427b9c9e-27a1-45ce-9f04-0609eb74cb48.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635437605163910390/original/0db5cffd-7f0d-4e13-bd59-39cb9861cdaa.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635437605163910390/original/5a6ee29b-2c64-440a-aee6-481d4d8d1bd5.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635437605163910390/original/e22d9d0e-fa0b-48e1-9d35-ab7c3463b357.jpeg',
        preview: false
      },
    ])
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {})
  }
};
