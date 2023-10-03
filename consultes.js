const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function consulta() {
    try {
        await client.connect();
        console.log("Conexión establecida correctamente");
        const db = client.db("Restaurants");
        const restaurants = db.collection("Restaurants");
        let resultats;

        // 1. Escriu una consulta per mostrar tots els documents en la col·lecció Restaurants.
        resultats = restaurants.find();

        // 2. Escriu una consulta per mostrar el restaurant_id, name, borough i cuisine de tots els documents en la col·lecció Restaurants.
        //resultats = restaurants.find().project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1});

        // 3. Escriu una consulta per mostrar el restaurant_id, name, borough i cuisine, però excloent el camp _id per tots els documents en la col·lecció Restaurants.
        //resultats = restaurants.find().project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});

        // 4.Escriu una consulta per mostrar restaurant_id, name, borough i zip code, però excloent el camp _id per tots els documents en la col·lecció Restaurants.
        //resultats = restaurants.find().project({restaurant_id: 1, name: 1, borough: 1, 'address.zipcode': 1, _id: 0});
        
        // 5. Escriu una consulta per mostrar tots els restaurants que estan en el Bronx.
        //resultats = restaurants.find({borough: 'Bronx'});

        // 6. Escriu una consulta per mostrar els primers 5 restaurants que estan en el Bronx.
        //resultats = restaurants.find({borough: 'Bronx'}).limit(5);

        // 7. Escriu una consulta per mostrar els 5 restaurants després de saltar els primers 5 que siguin del Bronx.
        //resultats = restaurants.find({borough: 'Bronx'}).skip(5).limit(5);

        // 8. Escriu una consulta per trobar els restaurants que tenen algun score més gran de 90.
        //resultats = restaurants.find({grades: {$elemMatch: {score: {$gt: 90}}}});

        // 9. Escriu una consulta per trobar els restaurants que tenen un score més gran que 80 però menys que 100.
        //resultats = restaurants.find({grades: {$elemMatch: {score: {$in: [80, 100]}}}});
        
        // 10. Escriu una consulta per trobar els restaurants que estan situats en una longitud inferior a -95.754168.
        //resultats = restaurants.find({'address.coord.0': {$lt: -95.754168}});

        // 11. Escriu una consulta de MongoDB per a trobar els restaurants que no cuinen menjar 'American ' i tenen algun score superior a 70 i longitud inferior a -65.754168.
        //resultats = restaurants.find({$and:[{cuisine: {$ne: 'American'}},{grades: {$elemMatch: {score: {$gt: 70}}}},{'address.coord.0': {$lt: -65.754168}}]});
        
        // 12. Escriu una consulta per trobar els restaurants que no preparen menjar 'American' i tenen algun score superior a 70 i que, a més, es localitzen en longituds inferiors a -65.754168. Nota: Fes aquesta consulta sense utilitzar operador $and.
        //resultats = restaurants.find({cuisine: {$ne: 'American'}, grades: {$elemMatch: {score: {$gt: 70}}}, 'address.coord.0': {$lt: -65.754168}});

        // 13. Escriu una consulta per trobar els restaurants que no preparen menjar 'American ', tenen alguna nota 'A' i no pertanyen a Brooklyn. S'ha de mostrar el document segons la cuisine en ordre descendent.
        //resultats = restaurants.find({cuisine: {$ne: 'American'}, grades: {$elemMatch: {grade: "A"}}, borough: {$ne: "Brooklyn"}}).sort({cuisine: 1});

        // 14. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'Wil' en les tres primeres lletres en el seu nom.
        //resultats = restaurants.find({name: /^Wil/}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1});
        
        // 15. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'ces' en les últimes tres lletres en el seu nom.
        // resultats = restaurants.find({name: /ces$/}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1});
        
        // 16. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'Reg' en qualsevol lloc del seu nom.
        //resultats = restaurants.find({name: /Reg/g}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1});

        // 17. Escriu una consulta per trobar els restaurants que pertanyen al Bronx i preparen plats Americans o xinesos.
        //resultats = restaurants.find({$and: [{borough: 'Bronx'},{$or: [{cuisine: 'American'}, {cuisine: 'Chinese'}]}]});

        // 18. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per aquells restaurants que pertanyen a Staten Island, Queens, Bronx o Brooklyn.
        //resultats = restaurants.find({$or: [{borough: 'Staten Island'}, {borough: 'Queens'}, {borough: 'Bronx'}, {borough: 'Brooklyn'}]}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});

        // 19. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que NO pertanyen a Staten Island, Queens, Bronx o Brooklyn.
        //resultats = restaurants.find({$nor: [{borough: 'Staten Island'}, {borough: 'Queens'}, {borough: 'Bronx'}, {borough: 'Brooklyn'}]}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});

        // 20. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que aconsegueixin una nota menor que 10.
        //resultats = restaurants.find({grades: {$elemMatch: {score: {$lt: 10}}}}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});

        // 21. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que preparen marisc ('seafood') excepte si són 'American ', 'Chinese' o el name del restaurant comença amb lletres 'Wil'.
        //resultats = restaurants.find({$and:[{cuisine: {$ne: 'American'}},{cuisine: {$ne: 'Chinese'}},{name: {$not: /^Wil/}}]}).project({restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});

        // 22. Escriu una consulta per trobar el restaurant_id, name i grades per a aquells restaurants que aconsegueixin un grade de "A" i un score d'11 amb un ISODate "2014-08-11T00:00:00Z".    
        // resultats = restaurants.find({grades: {$elemMatch: {grade: {$eq: 'A'}, score: {$eq: 11}, date: new Date('2014-08-11T00:00:00Z')}}}).project({restaurant_id: 1, name: 1, grades: 1})

        // 23. Escriu una consulta per trobar el restaurant_id, name i grades per a aquells restaurants on el 2n element de l'array de graus conté un grade de "A" i un score 9 amb un ISODate "2014-08-11T00:00:00Z".
        //resultats = restaurants.find({'grades.1.grade': "A", 'grades.1.score': 9, 'grades.1.date': new Date("2014-08-11T00:00:00Z")}).project({restaurant_id: 1, name: 1, grades: 1});

        // 24. Escriu una consulta per trobar el restaurant_id, name, adreça i ubicació geogràfica per a aquells restaurants on el segon element de l'array coord conté un valor entre 42 i 52.
        // resultats = restaurants.find({"address.coord.1": {$lt: 52, $gt: 40}}).project({restaurant_id: 1, name: 1, address: 1, _id: 0});
        
        // 25. Escriu una consulta per organitzar els restaurants per nom en ordre ascendent.
        //resultats = restaurants.find({}).sort({name: -1});

        // 26. Escriu una consulta per organitzar els restaurants per nom en ordre descendent.
        // resultats = restaurants.find({}).sort({name: 1});

        // 27. Escriu una consulta per organitzar els restaurants pel nom de la cuisine en ordre ascendent i pel barri en ordre descendent.
        // resultats = restaurants.find({}).sort({cuisine: -1, borough: 1});

        // 28. Escriu una consulta per saber si les direccions contenen el carrer
        // resultats = restaurants.find({'address.street': {$exists: true}});

        // 29. Escriu una consulta que seleccioni tots els documents en la col·lecció de restaurants on els valors del camp coord és de tipus Double.
        //resultats = restaurants.find({'address.coord': {$type: 1}})
        
        // 30. Escriu una consulta que seleccioni el restaurant_id, name i grade per a aquells restaurants que retornen 0 com a residu després de dividir algun dels seus score per 7.
        // resultats = restaurants.aggregate([{$unwind: "$grades"},{$match: {$expr: {$eq: [{ $mod: ["$grades.score", 7] }, 0]}}},{$project: {_id: 0, restaurant_id: 1, name: 1, grade: "$grades"}}]);
        
        // 31. Escriu una consulta per trobar el name de restaurant, borough, longitud, latitud i cuisine per a aquells restaurants que contenen 'mon' en algun lloc del seu name.
        // resultats = restaurants.find({ name: { $regex: /mon/i }}).project({ _id: 0, name: 1, borough: 1, "address.coord": 1, cuisine: 1 });

        // 32. Escriu una consulta per trobar el name de restaurant, borough, longitud, latitud i cuisine per a aquells restaurants que contenen 'Mad' com a primeres tres lletres del seu name.
        resultats = restaurants.find({ name: { $regex: /^Mad/i  }}).project({ _id: 0, name: 1, borough: 1, "address.coord": 1, cuisine: 1 });
        
        for await (const resultat of resultats) {
            console.dir(resultat);
        }    
    }finally {
        console.log("Tancant connexió amb la base de dades");
        await client.close(); 
    }
}

consulta().catch(console.dir);