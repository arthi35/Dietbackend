// const express = require('express')
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";

dotenv.config();
console.log(process.env.MONGO_URL);
const app = express()

const PORT=4000;
const diets=[{
    "id":"100",
    "name":"Banana",
    "poster":"https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bananas-218094b-scaled.jpg?quality=90&resize=556,505",
    "benifits": "It has more protien&less amount of fat.While eating banana in morning it brings the weight loss,while eating in night It reduce stress and increase in weight .Bananana was recommended for both body types(Ectomorphic&Endomorphic)in day to day life.",
    "chart":"https://html.scirp.org/file/3-6902673x4.png"
    },
    {
        "id":"101",
        "name":"Pomegranate",
        "poster":"https://s1.1zoom.me/big0/252/Pomegranate_Juice_Grain_Highball_glass_512596_1280x884.jpg",
        "benifits": "It has an optimum level of Calcium,Magnesium & Protien helps to maintain body weight in an optimum level.It will be more useful for  mesomorphic body type",
        "chart":"https://html.scirp.org/file/3-6902673x4.png"
    },
    {
        "id":"102",
        "name":"Bottleguard",
        "poster":"https://res.cloudinary.com/mosaic-wellness/image/upload/f_auto,w_1000,c_limit/v1639663209/BW%20BLOG/Untitled-design---2021-12-16T192632.659.jpg",
        "benifits": "It has great nutrition content which helps in reduce belly fat and also it is helpful for cells of belly to stimulate more",
        "chart":"https://html.scirp.org/file/3-6902673x4.png"
    },
    {
        "id":"103",
        "name":"Pumpkin",
        "poster":"https://png.pngtree.com/png-clipart/20201009/ourlarge/pngtree-pumpkin-clip-art-png-image_2355303.jpg",
        "benifits": "It has more nutrition like Zinc,Magnesium,Calcium & helps in aid weight loss.Scientists have proven seeds of pumpkin gives great weightloss",
        "chart":"https://html.scirp.org/file/3-6902673x4.png"
    },
    {
        "id":"104",
        "name":"Watermelon",
        "poster":"https://www.pngitem.com/pimgs/m/406-4068886_clipart-hearts-watermelon-hd-png-download.png",
        "benifits": "It has enourmous number of nutrition level.It gives more staminal power,& decrease in weight.Scientists has proven that the obese persons can eat this to reduction of the weight",
        "chart":"https://html.scirp.org/file/3-6902673x4.png"
    },
    {
        "id":"105",
        "name": "Groundnut",
        "poster":"https://bhuvi99.com/wp-content/uploads/2021/03/Um20Groundnut-2.jpg", 
        "benifits": "It has more protien especially the body builders can take this more to increase their muscle tissue.Avoid eating in the morning before breakfast (or) empty stomach because it causes enormous number of heat &Increase The body temerature",
        "chart":"https://html.scirp.org/file/3-6902673x4.png"
    },
    {
        "id":"106",
        "name": "Almond",
        "poster":"https://static.toiimg.com/photo/71490367.cms",
        "benifits": "It contains Omega-Fatty Acid and it also helps to decrease your weight.Endomorph body type person can consume four almonds to decrease their weight.But (6-10) of almonds will in bodyweight",
        "chart":"https://html.scirp.org/file/3-6902673x4.png"
    },
    {
        "id":"107",
        "name": "Fenugreek",
        "poster":"https://res.cloudinary.com/grohealth/image/upload/v1583847096/DCUK/Content/iStock-880909002.jpg",
        "benifits": "It contains calcium,magnisium,protien,zinc,iron.It also helps to reduce the body weight,and cools the body temperature.(1 spoon of fenugreek) is enough to consume daily,It recommends to the Endomorphic Body type person",
        "chart":"https://html.scirp.org/file/3-6902673x4.png"
    },
    {
        "id":"108",
        "name": "Sprouts",
        "poster":"https://www.funfoodfrolic.com/wp-content/uploads/2020/09/Sprout-Salad-Thumbnail.jpg",
        "benifits": "The rich protein food is Sprouts and it was very low in cost.It is the best food for the body builders to bring their body into an core",
        "chart":"https://html.scirp.org/file/3-6902673x4.png"
    }]
app.use(express.json());
// const MONGO_URL="mongodb://localhost";
const MONGO_URL=process.env.MONGO_URL;


async function createConnection(){
    const client=new MongoClient(MONGO_URL);
   await client.connect();
    console.log("Mongo is Connected✌😊")
    return client
}
const client=await createConnection()



app.get('/', function (request, response) {
  response.send('Hello World🙋‍♀️🌎!!!');
})
app.get('/diets', async function (request, response) {
    const diets=await client.db("diet").collection("diets").find({}).toArray()
    response.send(diets);
  });
  app.get('/diets/:id', async function (request, response) {
    console.log(request.params);
    const {id}=request.params;
    // const diet=diets.find((dt)=>dt.id===id);
    const diet=await client.db("diet").collection("diets").findOne({id:id})
    console.log(diet);
   diet? response.send(diet):response.status(404).send({message:"No such diet found"});
  });
  app.delete('/diets/:id', async function (request, response) {
    console.log(request.params);
    const {id}=request.params;
    // const diet=diets.find((dt)=>dt.id===id);
    const result=await client.db("diet").collection("diets").deleteOne({id:id})
    response.send(result);
  });
  app.put('/diets/:id', async function (request, response) {
    console.log(request.params);
    const {id}=request.params;
    const updatedata=request.body;
    // const diet=diets.find((dt)=>dt.id===id);
    const result=await client.db("diet").collection("diets").updateOne({id:id},{$set:updatedata})
    response.send(result);
  });
  app.post('/diets', async function (request, response) {
      const data=request.body;
      console.log(data);
    const result=await client.db("diet").collection("diets").insertMany(data)
    response.send(result);
  });
app.listen(PORT,()=>console.log(`Server Started in ${PORT}`))