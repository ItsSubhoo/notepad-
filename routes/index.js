var express = require('express');
var router = express.Router();
const path= require("path")
const fs =require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

  fs.readdir(`./public/files`,(err,files)=>{
    console.log(files);
    console.log(files[0])
    var djp=  files.map((e)=>{

      let op = path.basename(e,".txt");
      return op;
    })
    res.render('index', { files:djp });
    })
  
  
});

router.post("/create",(req,res)=>{

  console.log(req.body);

  let filename = "./public/files/"+req.body.title  +'.txt';
  let content= req.body.text;
  console.log(filename+content);
  fs.writeFile(filename,content,(err) => {
    if (err) {
      console.error("Error writing to file:", err);
      // Send an error response, possibly with an error code and message
      return res.status(500).send("Error creating file.");
    }});


  res.redirect(`/`);


})



router.get("/file/:filename",(req,res)=> {
  let fn = "./public/files/"+req.params.filename +'.txt';
  fs.readFile(fn,"utf-8",(err,filedata)=>{

      console.log(filedata);

      res.render("file" ,{filename:req.params.filename.toUpperCase(),filedata:filedata})
    })


});








module.exports = router;
