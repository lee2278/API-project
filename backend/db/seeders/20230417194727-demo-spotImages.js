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

      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-734136588867847427/original/0de0e9d3-a7e9-419c-b0d3-3c82def26eda.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-734136588867847427/original/769da7e9-382e-42d9-b484-f99207849218.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-734136588867847427/original/55cc2783-41c0-4b33-8a12-f2b35eee8cdc.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-734136588867847427/original/df6f5bc9-1d42-4f6c-b1f6-e4f597e83d72.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-734136588867847427/original/207e52f6-f274-49b7-a9bf-90766ab80223.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53313736/original/cf951feb-bd7a-4801-92eb-dbc25cd9870e.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53313736/original/ec964f2e-5668-4fe9-a184-614de2ab2246.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53313736/original/c55932aa-a91c-410b-9b2c-0f8e779550b2.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53313736/original/7885b96d-7a79-4129-b74b-dd77ab05eebf.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53313736/original/d52d31c7-1187-4949-b5dd-c68aaec2c867.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-884157854709275542/original/d8fac829-0087-489e-9e78-c2a828d24653.jpeg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-884157854709275542/original/5178fd1f-cc6c-4a02-a0ad-5397c0a10175.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-884157854709275542/original/15898166-4b64-44d4-9e7e-a89612b7cf70.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-884157854709275542/original/ec37802c-cbf1-4b45-b902-85fb5fab0a41.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-884157854709275542/original/b0a173db-fc58-4647-9bab-133eb52881af.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-881730119022557915/original/8771e15b-ec9f-4802-83d8-b1d8dbb39c1c.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-881730119022557915/original/4e812ec2-b51c-4cf0-9dc0-b02d6e5d541f.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-881730119022557915/original/ac0bb9a5-7f2c-40b6-914a-da502f7c267f.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-881730119022557915/original/bf9ba951-8536-4b6a-b492-9284b95e7cd4.jpeg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-881730119022557915/original/9bab1e75-87a4-4043-986a-fc92d5ac20f9.jpeg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/a516764f-8f8d-4fe3-a5fb-b231061c4799.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/c51770c6-5c79-4daa-8b6c-3f112c64fecb.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/e59dd3d9-b867-4a2d-927d-2d42dee95a83.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/67cca564-df21-43f4-a941-3e5d02e8c44c.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/6901c9d0-7515-49f0-aa1b-bbbf78c977cc.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-51763616/original/55d517f8-d13b-48e1-a50d-94e849ada539.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-51763616/original/63092bbf-0510-4d36-975b-4545cdd6e38c.jpeg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-51763616/original/150cd661-5d6d-45a5-bcab-feea16e7d955.jpeg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-51763616/original/8c392087-3dc0-4844-b220-359a1eb89956.jpeg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-51763616/original/cdcfdfe0-a76f-4d22-bd80-28a44a1fa219.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-558790739776193863/original/60ab8c98-96c4-4a38-ae82-3f2dfc05cffd.jpeg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-558790739776193863/original/a84221a7-4fd5-4169-a0a7-281c1eff8a9d.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-558790739776193863/original/d610b12b-9034-4383-a9c0-866cf1c0835c.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-558790739776193863/original/6bc9448e-48ea-4df2-ad82-c0b5e82acf5e.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-558790739776193863/original/f477b61c-1200-4e0e-a5b3-b1539986c9b3.jpeg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-8987502/original/8a4bb0d9-8d68-41d8-bc67-27bb25cb878a.jpeg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-8987502/original/33326c44-70bc-498e-9c19-ac43e497e192.jpeg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-8987502/original/e9377994-6409-4a5d-8197-5887e781b269.jpeg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-8987502/original/5ffd25ce-d021-4119-a97d-bd2744ed48d6.jpeg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-8987502/original/b1ec374f-c6a8-40bf-806d-b045209e61ce.jpeg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-862168096056047811/original/4c71f3f4-e602-4cb6-af28-db0338724243.jpeg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-862168096056047811/original/a4484dcf-162f-40bf-823c-a4d8b88047b0.jpeg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-862168096056047811/original/4c8cc70e-4324-48b0-b4f9-3df2666c1aa6.jpeg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-862168096056047811/original/c8eadb0f-a37e-408d-b356-4200cfa953d7.jpeg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-862168096056047811/original/bd7b8c36-92b9-44b3-8b31-b45d4b195371.jpeg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-893393749986438139/original/19bf201e-4aa0-4d3b-b40e-d205d461003a.jpeg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-893393749986438139/original/6707200b-04bd-4849-b4f0-a0c6e6438347.jpeg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-893393749986438139/original/70e27b28-eeee-49e4-a958-d35bdcbdcd93.jpeg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-893393749986438139/original/37ae56ec-6fb1-41a7-b324-089554cdbe7c.jpeg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-893393749986438139/original/1b805031-3f36-4062-8362-8fcc98fae80e.jpeg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-30585416/original/21a695c4-a7f0-44dd-83ce-c756bc2b8787.jpeg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/90528a02-2ffd-46db-bece-18b671a50ada.jpg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-30585416/original/378f5648-b33d-40e8-b195-3c0772aef8c2.jpeg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-30585416/original/317f2f5a-c6ce-466a-87a9-c664e783daf4.jpeg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-30585416/original/273676bc-23a2-489b-b60a-b833d11640e7.jpeg',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-924816983998274062/original/9565b773-7586-4412-994f-2c7f6543a71c.jpeg',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-924816983998274062/original/9fa1079c-a41e-4902-81dd-c5a7f83c379f.jpeg',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-924816983998274062/original/71a39683-6f64-40d5-af5c-9f9230b431aa.jpeg',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-924816983998274062/original/da0e04a5-a283-4f41-b963-e1d3d12d0fb3.jpeg',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-924816983998274062/original/d6196b65-51f4-4e69-aa65-6e2cac776196.jpeg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49331267/original/a5833be3-5ba4-4010-a123-aeeec3538e09.jpeg',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49331267/original/cacf85f0-a1ee-4489-9391-1594be212cc9.jpeg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49331267/original/811ba1c0-5807-4847-ba9f-0e4c6896a193.jpeg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49331267/original/70cc0596-125f-4706-962c-84b6b2e89390.jpeg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49331267/original/630b207f-683e-4ff7-826e-6d8c0ae3741e.jpeg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-43656249/original/96534fc4-9136-4aeb-8061-823d0a583da3.jpeg',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-43656249/original/a5f3663d-9138-401a-8fce-94aae2cae65d.jpeg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-43656249/original/49acda8f-fa7a-4028-a74a-10f0194ff810.jpeg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-43656249/original/86a7c696-c768-4362-b2d3-530e940154ff.jpeg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-43656249/original/2b5a3007-b2ef-4357-bd57-8b7063a22d7a.jpeg',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-673941096965423234/original/28f1a767-5a1e-492b-a4fc-35199e7026c0.jpeg',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-673941096965423234/original/8a1f928e-2fdf-4e4e-ac47-3f94f7a33345.jpeg',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-673941096965423234/original/3dcc7b6f-98a0-4014-85b6-34f9d6861cff.jpeg',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-673941096965423234/original/fb2bf28f-2d47-4bfb-8124-3f94d699d815.jpeg',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-673941096965423234/original/194fe5fd-bda2-47ab-8c08-18de5999bd64.jpeg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-602832526106973924/original/6d7ccddc-3ad8-44ea-bba7-d22778e87658.jpeg',
        preview: true
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-602832526106973924/original/fddd1e1d-0214-4c10-b3bb-21eff301c115.jpeg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-602832526106973924/original/13c8e50d-4978-450e-b87c-37aacb007871.jpeg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-602832526106973924/original/7e5de415-e30c-4aa3-9f6c-1ade69f4337a.jpeg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-602832526106973924/original/d253d18f-10b0-4b25-9545-3288a75084f0.jpeg',
        preview: false
      },
    ])
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {})
  }
};
