var express = require('express');
var app = express();

app.use(express.static('./'))

console.log('Now starting server...')

app.listen(3000, function () {
  console.log('Click-a-brick app listening on port 3000!');
});
