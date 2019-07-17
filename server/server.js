const express = require('express');
const app = express();
const apiRoutes = express.Router();
const axios = require('axios');
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
apiRoutes.get('/getDiscList', function (req, res) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data);
  }).catch((e) => {
    console.log(e);
  });
});
apiRoutes.get('/lyric', function (req, res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    let ret = response.data;
    if (typeof ret === 'string') {
      const reg = /^\w+\(({[^()]+})\)$/;
      const matches = ret.match(reg);
      if (matches) {
        ret = JSON.parse(matches[1]);
      }
    }
    res.json(ret);
  }).catch((e) => {
    console.log(e);
  });
});
app.use('/api', apiRoutes);
app.listen(4000, () => {
  console.log('http://localhost:4000');
});
