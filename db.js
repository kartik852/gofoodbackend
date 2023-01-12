const mongoose = require('mongoose');
const url="mongodb://foody:kartikk1103@ac-kowyhig-shard-00-00.muxudxf.mongodb.net:27017,ac-kowyhig-shard-00-01.muxudxf.mongodb.net:27017,ac-kowyhig-shard-00-02.muxudxf.mongodb.net:27017/foody?ssl=true&replicaSet=atlas-ilcbyf-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongodb=async()=>{
    await mongoose.connect(url,{useNewUrlParser: true},async(err,result)=>{
        if(err) console.log(err);
        else{
            console.log("connected");
        }
        let fetched_data= await mongoose.connection.collection("food_category");
        fetched_data.find({}).toArray(async function( err,data){
            const foodCategory = await mongoose.connection.collection("food_items");
            foodCategory.find({}).toArray(function(err,CatData){
                if(err) console.log(err);
            else {
                global.food_items = data;
                global.food_category = CatData;
            }
            })
            // if(err) console.log(err);
            // else {
            //     global.food_items = data;
            // }
        })
    });

}
module.exports=mongodb;