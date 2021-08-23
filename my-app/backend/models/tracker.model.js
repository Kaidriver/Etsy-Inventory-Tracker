const mongoose = require('mongoose')

const Schema = mongoose.Schema

const trackerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  hooks: {
    type: [String],
    required: true
  },
  losses: {
    type: [Number],
    required: true
  },
  properties: {
    type: [Object],
    required: true
  },
  link: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  },
  buyDate: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Tracker = mongoose.model('Tracker', trackerSchema)
module.exports = Tracker
