const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const trackersRouter = require('./routes/trackers')
const hooksRouter = require('./routes/hooks')

app.use('/trackers', trackersRouter)
app.use('/hooks', hooksRouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static('my-app/build'))
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
