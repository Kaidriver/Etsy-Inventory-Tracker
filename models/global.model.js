const mongoose = require('mongoose')

const Schema = mongoose.Schema

const globalSchema = new Schema({
  lastUpdated: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const GlobalDocument = mongoose.model('GlobalDocument', globalSchema)
module.exports = GlobalDocument
