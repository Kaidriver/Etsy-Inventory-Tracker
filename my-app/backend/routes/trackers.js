const router = require('express').Router()
const axios = require('axios')
let Tracker = require('../models/tracker.model')
let GlobalDocument = require('../models/global.model')

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

router.route('/getTrackers').get(async (req, res) => {

  var result = await GlobalDocument.findOne()
  console.log(result)

  if (result == null) {
    var lastUpdated = new Date().getTime()
    const newGlobal = new GlobalDocument({
      lastUpdated
    })

    await newGlobal.save()
  }

  var receipts = await axios.get("https://openapi.etsy.com/v3/application/shops/{shop_id}/transactions?shop_id=16865070&limit=5", {
    headers: {
      'x-api-key': 'lyms2hdybmhateqpeaijf81o',
      'Authorization': 'Bearer 136313404.zUPwxEd7VWXBZCpgel9XfLtejdixfMkxCMCqKIloYztSPxF7LzXv8kexd26XqIk-FNnlC71C6M-x4ypApxC1QVgS6-'
    }
  })

  var trackers = await Tracker.find()

  for (var receipt of receipts.data.results) {
    var response = await axios.get("https://openapi.etsy.com/v3/application/listings/{listing_id}/inventory/products/{product_id}?listing_id=" + receipt.listing_id + "&product_id=" + receipt.product_id, {
      headers: {
        'x-api-key': 'lyms2hdybmhateqpeaijf81o',
        'Authorization': 'Bearer 136313404.zUPwxEd7VWXBZCpgel9XfLtejdixfMkxCMCqKIloYztSPxF7LzXv8kexd26XqIk-FNnlC71C6M-x4ypApxC1QVgS6-'
      }
    })

    var productProps = {}
    response.data.property_values.forEach(property => productProps[property.property_name] = property.values[0])

    for (var tracker of trackers) {
      var index = tracker.hooks.indexOf(receipt.title)

      if (index != -1 && JSON.stringify(tracker.properties[index]) === JSON.stringify(productProps)) {
        console.log(tracker.properties[index], JSON.stringify(productProps))
        tracker.qty = tracker.qty - tracker.losses[index]

        await tracker.save()
          .then(() => console.log("Saved!"))
          .catch(err => console.log(err));
      }
    }
  }

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
      tracker.properties = req.body.properties
      tracker.link = req.body.link
      tracker.lastUpdated = req.body.lastUpdated

      tracker.save()
        .then(() => res.json('Tracker updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})
