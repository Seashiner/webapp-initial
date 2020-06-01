const {seller,goods,ratings} = require("./data/data.json")
const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave:'warning',
  devServer:{
    open:true,
    before: function(app) {
      app.get('/api/seller', function(req, res) {
        res.json({code:200,data:seller});
      });
      app.get('/api/goods', function(req, res) {
        res.json({code:200,data:goods});
      });
      app.get('/api/ratings', function(req, res) {
        res.json({code:200,data:ratings});
      });
    }
  },
  configureWebpack:{
    resolve: {
        alias: {
          '@': resolve('src'),
          'pages': resolve('src/pages'),
          'components': resolve('src/components'),
        }
    }
}
}


