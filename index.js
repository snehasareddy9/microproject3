

//https://stackoverflow.com/questions/39941870/how-to-fetch-data-from-mongodb-using-nodejs-expressjs



const express = require('express');
const bodyparser=require('body-parser');
const MongoClient=require('mongodb').MongoClient
const mongoose = require('mongoose');



const Table=require('./models/post');
const Record=mongoose.model('Record');


var db;

// Initialize app
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());

app.set('view engine','ejs');


MongoClient.connect('mongodb://localhost:27017/MICROPROJECT-3',(err,database)=>{
    if(err) return console.log(err)
    db=database.db('MICROPROJECT-3')
    app.listen(5000,()=>{
        console.log('Listening to port number 5000')
    })
})





let info
app.get('/', function (req, res) {
    Table.getTable(function(err,data){
        if(err){throw err};
        this.info=data;
        //res.json(data);
    });
    //res.sendFile(__dirname+'/views/home.ejs');
    console.log("hii"+this.info);
    res.render('home',this.info);
    
});



    app.get('/insert',function(req,res){
        res.sendFile(__dirname+'/insert.html');

    });

    app.post('/InsertPerform',function(req,res){
        insertRecord(req,res)
        res.redirect('/');
    });


    app.get('/update',function(req,res){
        res.sendFile(__dirname+'/update.html');
    })


    app.post('/UpdatePerform',function(req,res){
        updateRecord(req,res)
        res.redirect('/')
    })


    app.get('/delete',function(req,res){
        res.sendFile(__dirname+'/delete.html');
    })


    app.post('/DeletePerform',function(req,res){
        DeleteRecord(req,res);
        res.redirect('/');
    })



    function insertRecord(req,res){
        console.log("hello from function"+req.body.id);
        const doc=new Record({
            id:req.body.id,
            Name:req.body.name,
            Price:req.body.price,
            Stock:req.body.stock
        })

        doc.save();

    }

    function updateRecord(req,res){
        var s;
        db.collection('Inventory_Managment').find().toArray((err,result)=>{
            if(err) return console.log(err)
            for(var i=0;i<result.length;i++){
                if(result[i].id==req.body.id){
                    s=result[i].Stock
                    break;
                }
            }
            console.log("stock is........................."+s)
            db.collection('Inventory_Managment').findOneAndUpdate({id :req.body.id},{
                $set:{Stock: parseInt(s)+parseInt(req.body.stock)}},
                (err,result)=>{
                    if(err) return res.send(err)
                    console.log(req.body.stock+ ' stock updated')
                })
        })
    }


    function DeleteRecord(req,res){
        db.collection('Inventory_Managment').findOneAndDelete({
            id : req.body.id
        },
        (err,result)=>{if(err) console.log(err)}
        )
    }



   /* app.listen(3000,function(req,res){
        console.log("connected sucessfully")
    })
*/

app.use(express.static("public"));
module.exports=info;

