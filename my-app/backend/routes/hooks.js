const router = require('express').Router()
const axios = require('axios')

router.route('/getProducts').get((req, res) => {
  axios.get("https://openapi.etsy.com/v3/application/shops/{shops_id}/listings/active?shop_id=16865070", {
    headers: {
      'x-api-key': 'lyms2hdybmhateqpeaijf81o'
    }
  })
  .then(response => {
      res.send(response.data.results)
  });
})

router.route('/getProperties/:id').get((req, res) => {
  axios.get("https://openapi.etsy.com/v3/application/listings/{listing_id}/inventory?listing_id=" + req.params.id, {
    headers: {
      'x-api-key': 'lyms2hdybmhateqpeaijf81o',
      'Authorization': 'Bearer 136313404.tSJ7KgkL970pglI5o9f8M65O9RyrN1dSsYv86Z4mkJtDkmO9CX_PDi7bR08CvwEMabcMKhk6mMuHQ_B-FM93Q8djXW'
    }
  })
  .then(response => {

    var properties = {}
    for (var i = 0; i < response.data.products[0].property_values.length; i++) {
      properties[response.data.products[0].property_values[i].property_name] = [...new Set(response.data.products.map(product => product.property_values[i].values[0]))]
    }

    res.json(properties)
  })
})

module.exports = router
