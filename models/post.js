const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MICROPROJECT-3',{useNewUrlParser : true} , (err)=>{
    if(!err){console.log("Mongodb Connected Sucessfully")}
    else{console.log("error to mongodb")}
});

let postSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Stock: {
        type: String,
        required: true
    }
},
 {collection : 'Inventory_Managment'}
);

let Post = module.exports = mongoose.model('Record', postSchema);

module.exports.getTable=function(callback){
    Post.find(callback);
}