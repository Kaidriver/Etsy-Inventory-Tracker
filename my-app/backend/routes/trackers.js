const router = require('express').Router()
const axios = require('axios')
let Tracker = require('../models/tracker.model')
let GlobalDocument = require('../models/global.model')
const puppeteer = require('puppeteer')

module.exports = router

function arePropertiesEqual(savedTracker, prodProperties) {

  var savedKeys = Object.keys(savedTracker)

  for (var i = 0; i < savedKeys.length; i++) {
    if (savedTracker[savedKeys[i]] != "Any" && prodProperties[savedKeys[i]] != savedTracker[savedKeys[i]]) {
      console.log("FALSE")
      return false;
    }
  }

  return true;
}

router.route('/addTracker').post(async (req, res) => {
  var amazonURL = req.body.link
  var browser = await puppeteer.launch()
  var page = await browser.newPage()

  await page.goto(amazonURL, {waitUntil: 'networkidle2'})

  let src = await page.evaluate(() => {
    let parseSrc = document.querySelector("#imgTagWrapperId img").src

    return {
      img: parseSrc
    }
  })

  await browser.close()

  const name = req.body.name
  const qty = Number(req.body.qty)
  const hooks = req.body.hooks
  const losses = req.body.losses
  const properties = req.body.properties
  const link = req.body.link
  const lastUpdated = req.body.lastUpdated
  const imgSrc = src.img

  const newTracker = new Tracker({
    name,
    qty,
    hooks,
    losses,
    properties,
    link,
    imgSrc,
    lastUpdated
  })

  newTracker.save()
    .then(doc => res.json({
      _id: doc._id,
      src: imgSrc
    }))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/getTrackers').get(async (req, res) => {

  var result = await GlobalDocument.findOne()

  if (result == null) {
    var lastUpdated = new Date().getTime()
    const newGlobal = new GlobalDocument({
      lastUpdated
    })

    await newGlobal.save()
    result = newGlobal
  }

  var receipts = await axios.get("https://openapi.etsy.com/v3/application/shops/{shop_id}/transactions?shop_id=16865070&limit=5", {
    headers: {
      'x-api-key': 'lyms2hdybmhateqpeaijf81o',
      'Authorization': 'Bearer 136313404.x-koYPFubsODUI85cEmTB3NMaW7b2U_OFMim0-zoH-8fFYikDLmSNN5WuElPwf5JsWTbuLg3GGsobnKLHOnGIS9L5A'
    }
  })

  receipts = receipts.data.results
  // .filter(receipt => receipt.create_timestamp >= result.lastUpdated)
  var trackers = await Tracker.find()

  for (var receipt of receipts) {
    var response = await axios.get("https://openapi.etsy.com/v3/application/listings/{listing_id}/inventory/products/{product_id}?listing_id=" + receipt.listing_id + "&product_id=" + receipt.product_id, {
      headers: {
        'x-api-key': 'lyms2hdybmhateqpeaijf81o',
        'Authorization': 'Bearer 136313404.x-koYPFubsODUI85cEmTB3NMaW7b2U_OFMim0-zoH-8fFYikDLmSNN5WuElPwf5JsWTbuLg3GGsobnKLHOnGIS9L5A'
      }
    })

    var productProps = {}
    response.data.property_values.forEach(property => productProps[property.property_name] = property.values[0])

    for (var tracker of trackers) {
      var index = tracker.hooks.indexOf(receipt.title)

      if (index != -1 && arePropertiesEqual(tracker.properties[index], productProps)) {
        tracker.qty = tracker.qty - tracker.losses[index]

        await tracker.save()
          .then(() => console.log("Saved!"))
          .catch(err => console.log(err));
      }
    }
  }

  result.lastUpdated = new Date().getTime()
  result.save()
    .then(response => console.log("Date saved!"))

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
