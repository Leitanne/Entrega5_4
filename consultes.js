require('dotenv').config();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.HOST);
async function consulta() {
    try {
        await client.connect();
        console.log("Conexión establecida correctamente");

        const db = client.db(process.env.DATABASE);
        const restaurants = db.collection(process.env.COLLECTION);

        const queries = [
            /*1*/async () => {return await restaurants.find();},
            /*2*/async () => {return await restaurants.find().project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1});},
            /*3*/async () => {return await restaurants.find().project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});},
            /*4*/async () => {return await restaurants.find().project({restaurant_id: 1, name: 1, borough: 1, 'address.zipcode': 1, _id: 0});},
            /*5*/async () => {return await restaurants.find({borough: 'Bronx'});},
            /*6*/async () => {return await restaurants.find({borough: 'Bronx'}).limit(5);},
            /*7*/async () => {return await restaurants.find({borough: 'Bronx'}).skip(5).limit(5);},
            /*8*/async () => {return await restaurants.find({grades: {$elemMatch: {score: {$gt: 90}}}});},
            /*9*/async () => {return await restaurants.find({grades: {$elemMatch: {score: {$in: [80, 100]}}}});},
            /*10*/async () => {return await restaurants.find({'address.coord.0': {$lt: -95.754168}});},
            /*11*/async () => {return await restaurants.find({$and:[{cuisine: {$ne: 'American'}},{grades: {$elemMatch: {score: {$gt: 70}}}},{'address.coord.0': {$lt: -65.754168}}]});},
            /*12*/async () => {return await restaurants.find({cuisine: {$ne: 'American'}, grades: {$elemMatch: {score: {$gt: 70}}}, 'address.coord.0': {$lt: -65.754168}});},
            /*13*/async () => {return await restaurants.find({cuisine: {$ne: 'American'}, grades: {$elemMatch: {grade: "A"}}, borough: {$ne: "Brooklyn"}}).sort({cuisine: 1});},
            /*14*/async () => {return await restaurants.find({name: /^Wil/}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1});},
            /*15*/async () => {return await restaurants.find({name: /ces$/}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1});},
            /*16*/async () => {return await restaurants.find({name: /Reg/g}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1});},
            /*17*/async () => {return await restaurants.find({$and: [{borough: 'Bronx'},{$or: [{cuisine: 'American'}, {cuisine: 'Chinese'}]}]});},
            /*18*/async () => {return await restaurants.find({$or: [{borough: 'Staten Island'}, {borough: 'Queens'}, {borough: 'Bronx'}, {borough: 'Brooklyn'}]}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});},
            /*19*/async () => {return await restaurants.find({$nor: [{borough: 'Staten Island'}, {borough: 'Queens'}, {borough: 'Bronx'}, {borough: 'Brooklyn'}]}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});},
            /*20*/async () => {return await restaurants.find({grades: {$elemMatch: {score: {$lt: 10}}}}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});},
            /*21*/async () => {return await restaurants.find({$and:[{cuisine: {$ne: 'American'}},{cuisine: {$ne: 'Chinese'}},{name: {$not: /^Wil/}}]}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});},
            /*22*/async () => {return await restaurants.find({grades: {$elemMatch: {grade: {$eq: 'A'}, score: {$eq: 11}, date: new Date('2014-08-11T00:00:00Z')}}}).project({restaurant_id: 1, name: 1, grades: 1});},
            /*23*/async () => {return await restaurants.find({'grades.1.grade': "A", 'grades.1.score': 9, 'grades.1.date': new Date("2014-08-11T00:00:00Z")}).project({restaurant_id: 1, name: 1, grades: 1});},
            /*24*/async () => {return await restaurants.find({"address.coord.1": {$lt: 52, $gt: 40}}).project({restaurant_id: 1, name: 1, address: 1, _id: 0});},
            /*25*/async () => {return await restaurants.find({}).sort({name: -1});},
            /*26*/async () => {return await restaurants.find({}).sort({name: 1});},
            /*27*/async () => {return await restaurants.find({}).sort({cuisine: -1, borough: 1});},
            /*28*/async () => {return await restaurants.find({'address.street': {$exists: true}});},
            /*29*/async () => {return await restaurants.find({'address.coord': {$type: 1}})},
            /*30*/async () => {return await restaurants.aggregate([{$unwind: "$grades"},{$match: {$expr: {$eq: [{ $mod: ["$grades.score", 7] }, 0]}}},{$project: {_id: 0, restaurant_id: 1, name: 1, grade: "$grades"}}]);},
            /*31*/async () => {return await restaurants.find({ name: { $regex: /mon/i }}).project({ _id: 0, name: 1, borough: 1, "address.coord": 1, cuisine: 1 });},
            /*32*/async () => {return await restaurants.find({ name: { $regex: /^Mad/i  }}).project({ _id: 0, name: 1, borough: 1, "address.coord": 1, cuisine: 1 });}
        ]
        
        for (let i = 0; i < queries.length; i++) {
            const queryFunction = queries[i];
            try {
                const result = await queryFunction();
                const documents = await result.toArray();

                documents.forEach((document) => {
                    console.log(document);
                });

            } catch (error) {
                console.error(`Error executing query ${i + 1}:`, error);
            }
        }
    }finally {
        console.log("Tancant connexió amb la base de dades");
        await client.close(); 
    }
}

consulta().catch(console.dir);