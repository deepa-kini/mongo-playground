const mongoose = require('mongoose');
const config = require('config');


const password = config.get('db.password');
const dbConnect = `mongodb+srv://root:${password}@playground.mryia.mongodb.net/playground?retryWrites=true&w=majority`
mongoose.connect(dbConnect)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('error', err.message));