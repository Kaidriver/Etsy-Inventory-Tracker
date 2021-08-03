const router = require('express').Router()
let Tracker = require('../models/tracker.model')

module.exports = router

router.route('/add').post((req, res) => {
  const name = req.body.name
  const qty = Number(req.body.qty)
  const hooks = req.body.hooks
  const losses = req.body.losses
  const link = req.body.link
  const lastUpdated = req.body.lastUpdated

  const newTracker = new Tracker({
    name,
    qty,
    hooks,
    losses,
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
