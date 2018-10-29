var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var  multer = require('multer');
var path = require('path');
var fs = require('fs');

var port = process.env.PORT || 2100; // used to create, sign, and verify tokens

const DIR = './uploads';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
   
  app.get('/api', function (req, res) {
    res.end('file catcher example');
  });
   
  app.post('/api/upload',upload.single('photo'), function (req, res) {
      if (!req.file) {
          console.log("No file received");
          return res.send({
            success: false
          });
      
        } else {
          console.log('file received');
          return res.send({
            success: true
          })
        }
  });

var query = require('./app/common/mqsqlHelper')
var auth = require('./app/route/auth/auth.route')
// var syscon = require('./app/route/syscon/syscon.route')
var sqlinjection = require('sql-injection')

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/auth', auth)
// app.use('/syscon', syscon)
app.use(sqlinjection)

app.listen(port);
console.log('Server running at http://localhost:' + port);
