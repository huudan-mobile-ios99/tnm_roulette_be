const mongoose = require('mongoose');
const deviceModel = require('./model/device');


async function listDevices  (name,io)  {
  try {
    const data = await deviceModel.find();
    if (!data || data.length === 0) {
      return {
        status: false,
        message: 'No device found',
        totalResult: null,
        data: [],
      };
    }
    io.emit(name, [data]);
  } catch (err) {
    throw new Error('Error fetching devices: ' + err.message);
  }
};


module.exports = {
  listDevices:listDevices
}
