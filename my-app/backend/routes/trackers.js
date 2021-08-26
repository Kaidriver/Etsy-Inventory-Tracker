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
        'Authorization': process.env.ETSY_API_KEY
      }
    })

    var productProps = {}
    response.data.property_values.forEach(property => productProps[property.property_name] = property.values[0])

    var index = tracker.hooks.indexOf(receipt.title)

    while (index != -1) {
      if (arePropertiesEqual(tracker.properties[index], productProps)) {
        totalLoss += tracker.losses[index] * receipt.quantity
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
        'Authorization': process.env.ETSY_API_KEY
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
    var secondsLeft = rate != 0 ? tracker.qty / rate : 1210000
    var dateToBuy = new Date()
    dateToBuy.setSeconds(dateToBuy.getSeconds() + secondsLeft)

    return dateToBuy
}

async function scrapeInfo(link) {
  var amazonURL = link
  var browser = await puppeteer.launch()
  var page = await browser.newPage()

  await page.goto(amazonURL, {waitUntil: 'networkidle2'})

  let src = await page.evaluate(() => {
    var displacement = new Date()

    let parseSrc = document.querySelector("#imgTagWrapperId img").src
    let fastShippingMsg = document.querySelector("#mir-layout-DELIVERY_BLOCK-slot-UPSELL b")
    let slowShippingMsg = document.querySelector("#mir-layout-DELIVERY_BLOCK-slot-DELIVERY_MESSAGE b")
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    var shippingMsg = fastShippingMsg != null ? fastShippingMsg.innerText : slowShippingMsg.innerText
    shippingMsg = shippingMsg.split(" ")

    var index = -1
    for (var msg of shippingMsg) {
        var occurrence = MONTHS.indexOf(msg)

        if (occurrence != -1) {
          index = occurrence
        }
    }

    if (index == -1) {
      if (shippingMsg[0] == "Tomorrow") {
        displacement.setDate(displacement.getDate() + 2)
      }
      else {
        displacement.setDate(displacement.getDate() + 1)
      }
    }
    else {
      var numIndex = shippingMsg.indexOf(MONTHS[i])

      for (var i = numIndex + 1; i < shippingMsg.length; i++) {
        if (!isNaN(shippingMsg[i])) {
          numIndex = i
        }
      }

      displacement.setMonth(index)
      displacement.setDate(shippingMsg[numIndex])
    }

    return {
      img: parseSrc,
      shippingDate: displacement.getTime()
    }
  })

  await browser.close()

  return src
}

router.route('/addTracker').post(async (req, res) => {

  var src = await scrapeInfo(req.body.link)

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

  var date = await getBuyDate(newTracker)
  date.setMilliseconds(date.getMilliseconds() - (src.shippingDate - new Date().getTime()) - 86400000)

  newTracker.buyDate = date.toLocaleDateString('en-US')
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
      'Authorization': process.env.ETSY_API_KEY
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

      var src = await scrapeInfo(req.body.link)

      var date = await getBuyDate(tracker)
      date.setMilliseconds(date.getMilliseconds() - (src.shippingDate - new Date().getTime()) - 86400000)

      tracker.buyDate = date.toLocaleDateString('en-US')

      tracker.save()
        .then(() => res.json({
          buyDate: tracker.buyDate
        }))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router
