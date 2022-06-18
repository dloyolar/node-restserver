const mongoose = require('mongoose');
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('DB Connected 🎉!');
  } catch (error) {
    console.log(error);
    throw new Error('Error connect to DB');
  }
};

module.exports = {
  dbConnection,
};
