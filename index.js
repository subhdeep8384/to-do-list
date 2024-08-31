const { fileLoader } = require("ejs");
const express = require("express")
const fs = require("fs")
const app = express() ;
const path = require("path");



app.use(express.json()) ;
app.use(express.urlencoded({extended : true}) ) ;

app.use(express.static(path.join(__dirname , "public")));
app.set('view engine' , 'ejs') ;

app.get('/' , function(req , res ){
   
    fs.readdir(`./files` , (err , files)=>{
        console.log(files)
        res.render('index' , {files : files }) ;
    })
});


app.post('/create' , function(req , res ){
    console.log(req.body)
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details , function(err){
        res.redirect('./');
    })
});

app.get('/file/:filename' ,(req , res )=>{
    const filename = `${req.params.filename.split(" ").join("")}`
    console.log(filename)

    fs.readFile(`./files/${filename}`, "utf-8" , function(err,filedata){
     console.log(filedata);
     res.render("show" , {filename : req.params.filename , filedata : filedata})
    })
 });

 app.get("/delete/:filename" , function(req , res ){
    console.log(req.params.filename);
    fs.unlinkSync(`./files/${req.params.filename}`)
    res.redirect("/") ;
});

app.listen(3000 , function(){
    console.log("Server is running")
})