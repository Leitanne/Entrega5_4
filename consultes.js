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
        resultats = restaurants.find({grades: {$elemMatch: {score: {$in: [80, 100]}}}})
        
        for await (const resultat of resultats) {
            console.dir(resultat);
        }
        

    }finally {
        console.log("Tancant connexió amb la base de dades");
        await client.close(); 
    }
}

consulta().catch(console.dir);