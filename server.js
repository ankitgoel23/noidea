var express = require("express");
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/products',function(req,res){
    console.log(req.query);
    res.send('This is Random answer from server no : '+Math.floor((Math.random() * 10) + 1));
});

app.listen(PORT,function(){
    console.log("Server listening on :"+PORT);
})
app.use(bodyParser.json());

var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./Images");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });

var upload = multer({
     storage: Storage
 }).array("imgUploader", 3); 

//app.use(Express.static(__dirname));
app.post("/api/Upload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
         return res.end("File uploaded sucessfully!.");
     });
 });
