require('dotenv').config();
const { Country } = require('../models/country');
const { State } = require('../models/State');
const { City } = require('../models/City');

// Function to handle location requests
async function getLocation(iwant, id) {
  try {
    if (iwant === 'countries') {
      return await Country.findAll();
    } else if (iwant === 'states' && id) {
      return await State.findAll({ where: { country_id: id } });
    } else if (iwant === 'cities' && id) {
      return await City.findAll({ where: { state_id: id } });
    } else {
      return {'status':false,'message':'Some unexpected error'};
    }
  } catch (error) {
    return {'status':false,'message':error.message};
  }
}

module.exports = {
  getLocation
};

