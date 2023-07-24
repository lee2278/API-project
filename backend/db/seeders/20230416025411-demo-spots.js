'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(
      options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "Anaheim",
        state: "California",
        country: "United States of America",
        lat: 33.8366,
        lng: 117.9143,
        name: "House 10 mins away from Disneyland",
        description: "Great location to stay at if making a trip to Disney",
        price: 123,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 1,
        address: "321 Summer Lane",
        city: "Phoenix",
        state: "Arizona",
        country: "United States of America",
        lat: 33.448376,
        lng: -112.074036,
        name: "Stylish Three-Bedroom House",
        description: "A nice place to relax. House has a pool.",
        price: 200,
        createdAt: "2022-11-01 20:39:36",
        updatedAt: "2022-11-01 20:39:36"
      },
      {
        ownerId: 2,
        address: "456 Rainy Lane",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat:  47.608013,
        lng: -122.335167,
        name: "Cozy condo",
        description: "A condo by downtown close to the museums",
        price: 350,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 2,
        address: "789 Spring Lane",
        city: "Columbus",
        state: "Ohio",
        country: "United States of America",
        lat:  40.001633,
        lng:  -83.019707,
        name: "Comfy Townhouse",
        description: "Nice little townhouse in a quiet neighborhood",
        price: 350,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 3,
        address: "222 Cabin Lane",
        city: "Prescott",
        state: "Arizona",
        country: "United States of America",
        lat:  34.5400242,
        lng:   -112.4685025,
        name: "Cabin in the woods",
        description: "Get some fresh air with nature and the woods",
        price: 999,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 3,
        address: "321 Sunset Lane",
        city: "Sedona",
        state: "Arizona",
        country: "United States of America",
        lat:   34.871002,
        lng:  -111.760826,
        name: "By The Rocks - Amazing views & great location",
        description: "A thoughtfully designed private home, built to capture the stunning views of Sedona's Coffee Pot Rock, Chimney Rock and Thunder Mountain. ",
        price: 240,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 3,
        address: "451 Coyote Dr",
        city: "Flagstaff",
        state: "Arizona",
        country: "United States of America",
        lat:  35.1983,
        lng:  111.6513,
        name: "Stay at Coyote Pass",
        description: "Welcome to  Coyote Pass! Immerse yourself in the beautiful scenery of Flagstaff forests and mountains.",
        price: 855,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 3,
        address: "634 Clearwater Ln",
        city: "Colorado Springs",
        state: "Colorado",
        country: "United States of America",
        lat:  38.833,
        lng:  104.8214,
        name: "Beautiful modern style home, yet family friendly",
        description: "Enjoy Colorado Springs at this stylish 3311 sq ft home.  Newer build with modern decor in a great neighbor with mountain views.",
        price: 235,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 2,
        address: "877 Bear St",
        city: "Big Bear",
        state: "California",
        country: "United States of America",
        lat:  34.2439,
        lng:  116.9114,
        name: "Nordik Eskape-Romantic Scandinavian Treetop Cabin",
        description: "Enjoy the mountains by ski, board, foot, boat or bike. You'll want to come home to this Scandinavian Hideaway by day's end.",
        price: 180,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 2,
        address: "633 Getaway St",
        city: "San Diego",
        state: "California",
        country: "United States of America",
        lat:  32.7157,
        lng:  117.1611,
        name: "633 Top Floor Condo inside the gates of the Resort",
        description: "Just inside the gates of the resort this beautiful condo is just steps away from PFC Training Camp and Resort Spa/Salon.",
        price: 225,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 2,
        address: "8876 Bungalow Lane",
        city: "San Diego",
        state: "California",
        country: "United States of America",
        lat:  32.7157,
        lng:  117.1611,
        name: "Iconic North Park cottage with a retro vibe",
        description: "You'll be in a quiet neighborhood but a quick walk to all the hot bars, restaurants and boutique shops North Park has to offer. ",
        price: 200,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 2,
        address: "789 Spring Lane",
        city: "Oceanside",
        state: "California",
        country: "United States of America",
        lat:  33.1959,
        lng:  117.3795,
        name: "Newly Remodeled Beachfront Home with a Spa",
        description: "This is one of the last stand alone non shared beach home properties located on the WATER in Oceanside! HUGE private backyard area",
        price: 740,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 1,
        address: "7852 Jersey St",
        city: "Newark",
        state: "New Jersey",
        country: "United States of America",
        lat:  40.7357,
        lng:  74.1724,
        name: "NEW! Comfy King Suite 1BR",
        description: "A home away from home! Relax with the family at this peaceful 1 Bedroom, 1 Bath apartment in the greater Newark area. ",
        price: 115,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 1,
        address: "9982 Blissful Lane",
        city: "Newburyport",
        state: "Massachusetts",
        country: "United States of America",
        lat:  42.8126,
        lng:  70.8773,
        name: "Historic & Elegant Condo in Downtown",
        description: "Welcome to our stylish downtown Newburyport apartment, nestled in the highly sought-after South End neighborhood. This tastefully designed property comfortably sleeps 4 guests in two luxurious king-size beds.",
        price: 500,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 1,
        address: "2354",
        city: "Buffalo",
        state: "New York",
        country: "United States of America",
        lat:  42.8864,
        lng:  78.8784,
        name: "Front Park View Space Buffalo NY",
        description: "Welcome to our charming 2-bed, 1-bath lower apartment near Front Park in Buffalo, NY! This apartment offers flexibility and privacy.",
        price: 150,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      },
      {
        ownerId: 1,
        address: "3577 Niagara Lane",
        city: "Buffalo",
        state: "New York",
        country: "United States of America",
        lat:  42.8864,
        lng:  78.8784,
        name: "2 Bdrm New Stylish Apt for up to 6 ppl in Niagara",
        description: "Welcome to Vineyard Square! Our brand new stylish space in the very heart of St. Davids, Niagara-on-the-Lake is a perfect location to explore wine country, Niagara Falls and all the region has to offer.",
        price: 270,
        createdAt: "2022-12-01 20:39:36",
        updatedAt: "2022-12-01 20:39:36"
      }
      // {
      //   // id: 17,
      //   ownerId: 2,
      //   address: "148 Maui Way",
      //   city: "Lahaina",
      //   state: "Hawaii",
      //   country: "United States of America",
      //   lat:  20.8824,
      //   lng:  156.6816,
      //   name: "Maui Resort Rentals: Honua Kai Konea 148",
      //   description: "Konea 148 is a luxurious upgraded ground floor suite with one of Honua Kai's largest one bedroom floor plans and easy access to the pools, beach, and B.B.Qs.",
      //   price: 325,
      //   createdAt: "2022-12-01 20:39:36",
      //   updatedAt: "2022-12-01 20:39:36"
      // },
      // {
      //   // id: 18,
      //   ownerId: 2,
      //   address: "1112 Ilikai",
      //   city: "Waikiki",
      //   state: "Hawaii",
      //   country: "United States of America",
      //   lat:  21.2793,
      //   lng:  157.8292,
      //   name: "Ocean View Condo",
      //   description: "STUNNING OCEAN / LAGOON VIEWS! STEPS TO WAIKIKI BEACH. Memorable Meals and fireworks from the Lanai.  Walking distance to shopping mall, restaurants, shops, buses, rental cars, parks & Waikiki night life.",
      //   price: 190,
      //   createdAt: "2022-12-01 20:39:36",
      //   updatedAt: "2022-12-01 20:39:36"
      // },
      // {
      //   // id: 19,
      //   ownerId: 2,
      //   address: "789 Business St",
      //   city: "Chicago",
      //   state: "Illinois",
      //   country: "United States of America",
      //   lat:  41.8781,
      //   lng:  87.6298,
      //   name: "Unique and rambling designer flat",
      //   description: "The location literally can't be beat, with easy access to Wrigley Field, the bustling Southport shopping corridor, and all of the 'Boystown' nightlife. There's easy street parking on our block.",
      //   price: 130,
      //   createdAt: "2022-12-01 20:39:36",
      //   updatedAt: "2022-12-01 20:39:36"
      // },
      // {
      //   // id: 20,
      //   ownerId: 2,
      //   address: "1232 Sunny Drive",
      //   city: "San Jose",
      //   state: "California",
      //   country: "United States of America",
      //   lat:  37.3387,
      //   lng:  121.8853,
      //   name: "Studio Apartment Suite | WhyHotel by Placemakr",
      //   description: "Room for two, with just enough privacy when you need it. Modern touches and beautiful, natural light make this studio the perfect space to spend the night.",
      //   price: 140,
      //   createdAt: "2022-12-01 20:39:36",
      //   updatedAt: "2022-12-01 20:39:36"
      // }
    ]
    )
  },

  async down(queryInterface, Sequelize) {
    
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {})
    
  }
};
