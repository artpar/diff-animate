/**
 * Created by parth on 4/7/16.
 */


var express = require('express');
var app = express();

app.use(express.static('.'));

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});
