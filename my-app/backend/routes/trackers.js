const router = require('express').Router()
const axios = require('axios')
let Tracker = require('../models/tracker.model')
let GlobalDocument = require('../models/global.model')
const puppeteer = require('puppeteer')


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

async function calculateLoss(tracker, receipts) {

  var totalLoss = 0
  for (var receipt of receipts) {
    var response = await axios.get("https://openapi.etsy.com/v3/application/listings/{listing_id}/inventory/products/{product_id}?listing_id=" + receipt.listing_id + "&product_id=" + receipt.product_id, {
      headers: {
        'x-api-key': 'lyms2hdybmhateqpeaijf81o',
        'Authorization': 'Bearer 136313404.BdfaCB0lJRvP0KYnoJyFGyzXuxwHavN8Hu_FeWPlq2YxYoNKmWLYe7F1Gk56YSe2zzHAo1nOWdAJ2NzbC3xpPIBJnY'
      }
    })

    var productProps = {}
    response.data.property_values.forEach(property => productProps[property.property_name] = property.values[0])

    var index = tracker.hooks.indexOf(receipt.title)

    while (index != -1) {
      if (arePropertiesEqual(tracker.properties[index], productProps)) {
        totalLoss += tracker.losses[index]
      }

      index = tracker.hooks.indexOf(receipt.title, index + 1)
    }
  }

  return totalLoss
}

async function getBuyDate(tracker) {

    var receipts = await axios.get("https://openapi.etsy.com/v3/application/shops/{shop_id}/transactions?shop_id=16865070&limit=100", {
      headers: {
        'x-api-key': 'lyms2hdybmhateqpeaijf81o',
        'Authorization': 'Bearer 136313404.BdfaCB0lJRvP0KYnoJyFGyzXuxwHavN8Hu_FeWPlq2YxYoNKmWLYe7F1Gk56YSe2zzHAo1nOWdAJ2NzbC3xpPIBJnY'
      }
    })

    var totalLoss = await calculateLoss(tracker, receipts.data.results)

    //Find smallest time stamp
    var smallestTime = new Date().getTime()
    for (var receipt of receipts.data.results) {
      if (receipt.create_timestamp < smallestTime) {
        smallestTime = receipt.create_timestamp
      }
    }

    var rate = totalLoss / (new Date().getTime() / 1000 - smallestTime)
    var secondsLeft = tracker.qty / rate
    var dateToBuy = new Date()
    dateToBuy.setSeconds(dateToBuy.getSeconds() + secondsLeft)

    return dateToBuy.toLocaleDateString('en-US')
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
  const imgSrc = src.img
  const buyDate = ""

  const newTracker = new Tracker({
    name,
    qty,
    hooks,
    losses,
    properties,
    link,
    imgSrc,
    buyDate
  })

  newTracker.buyDate = await getBuyDate(newTracker)

  newTracker.save()
    .then(doc => res.json({
      _id: doc._id,
      src: imgSrc,
      buyDate: newTracker.buyDate
    }))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/getTrackers').get(async (req, res) => {

  var result = await GlobalDocument.findOne()

  if (result == null) {
    var lastUpdated = new Date().getTime() / 1000
    const newGlobal = new GlobalDocument({
      lastUpdated
    })

    await newGlobal.save()
    result = newGlobal
  }

  var receipts = await axios.get("https://openapi.etsy.com/v3/application/shops/{shop_id}/transactions?shop_id=16865070&limit=5", {
    headers: {
      'x-api-key': 'lyms2hdybmhateqpeaijf81o',
      'Authorization': 'Bearer 136313404.BdfaCB0lJRvP0KYnoJyFGyzXuxwHavN8Hu_FeWPlq2YxYoNKmWLYe7F1Gk56YSe2zzHAo1nOWdAJ2NzbC3xpPIBJnY'
    }
  })

  receipts = receipts.data.results
  // .filter(receipt => receipt.create_timestamp >= result.lastUpdated)
  var trackers = await Tracker.find()

  for (var tracker of trackers) {
    tracker.qty -= await calculateLoss(tracker, receipts) //TODO do asynchronously

    await tracker.save()
      .then(() => console.log("Saved!"))
      .catch(err => console.log(err));
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
    .then(async tracker => {
      tracker.name = req.body.name
      tracker.qty = Number(req.body.qty)
      tracker.hooks = req.body.hooks
      tracker.losses = req.body.losses
      tracker.properties = req.body.properties
      tracker.link = req.body.link
      tracker.buyDate = await getBuyDate(tracker)

      tracker.save()
        .then(() => res.json({
          buyDate: tracker.buyDate
        }))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router
