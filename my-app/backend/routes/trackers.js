const router = require('express').Router()
const axios = require('axios')
let Tracker = require('../models/tracker.model')

module.exports = router

router.route('/addTracker').post((req, res) => {
  const name = req.body.name
  const qty = Number(req.body.qty)
  const hooks = req.body.hooks
  const losses = req.body.losses
  const properties = req.body.properties
  const link = req.body.link
  const lastUpdated = req.body.lastUpdated

  const newTracker = new Tracker({
    name,
    qty,
    hooks,
    losses,
    properties,
    link,
    lastUpdated
  })

  newTracker.save()
    .then(doc => res.json(doc._id))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/getTrackers').get((req, res) => {
  Tracker.find()
    .then(trackers => res.json(trackers))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/deleteTracker/:id').delete((req, res) => {
  Tracker.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/updateTracker/:id').post((req, res) => {
  Tracker.findById(req.params.id)
    .then(tracker => {
      tracker.name = req.body.name
      tracker.qty = Number(req.body.qty)
      tracker.hooks = req.body.hooks
      tracker.losses = req.body.losses
      tracker.link = req.body.link
      tracker.date = req.body.lastUpdated

      tracker.save()
        .then(() => res.json('Tracker updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})
