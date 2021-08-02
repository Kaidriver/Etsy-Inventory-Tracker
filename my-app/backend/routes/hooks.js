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

module.exports = router
