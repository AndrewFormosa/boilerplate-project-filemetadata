var express = require('express');

var cors = require('cors');
require('dotenv').config()
const bodyParser = require("body-parser");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//app.route('/api/fileanalyse').post(function(req,res){

 // console.log(res);/

//})
//app.use("/api/fileanalyse",bodyParser.urlencoded({extended: false}));
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  var name=req.file.originalname;
  var type=req.file.mimetype;
  var size=req.file.size;
  var response = {name:name,type:type,size:size}
  res.json(response);
  next=>console.log("next");
  
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
