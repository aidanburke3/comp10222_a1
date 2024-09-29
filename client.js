// StAuth10222: I Aidan Burke, 000847978 certify that this material is my original work.
// No other person's work has been used without due acknowledgement.
// I have not made my work available to anyone else.

const axios = require('axios');

const baseUrl = 'http://localhost:3000/api';

// run tests
test1()
.then(test2);

async function test1() {

    // test data
    const item1 = {
        "title":"The Shawshank Redemption",
        "release_year": 1994,
        "timestamp":"2011-10-14T11:45:56.200"
    };
    const item2 = {
        "title":"Inceptoin",
        "release_year": 2001,
        "timestamp":"2010-03-12T06:20:20.200"
    };
    const item2Update = {
        "title":"Inception",
        "release_year": 2010,
        "timestamp":"2010-12-03T18:20:00.000"
    };

    console.log("Test 1");

    // add item 1
    let results = await axios.post(baseUrl, item1);

    // added properly?
    if (results?.data?.status !== "CREATE ENTRY SUCCESSFUL" ) {
            console.log("FAILED AT STEP 1");
            console.log(results?.data?.status);
            return;
    }

    // add item 2
    results = await axios.post(baseUrl, item2);

    // added properly?
    if (results?.data?.status !== "CREATE ENTRY SUCCESSFUL") {
        console.log("FAILED AT STEP 1");
        console.log(results?.data?.status);
        return;
    }

    // update item 2
    results = await axios.put(baseUrl+'/2', item2Update);

    // updated properly?
    if (results?.data?.status !== "UPDATE ITEM SUCCESSFUL") {
        console.log("FAILED AT STEP 2");
        console.log(results?.data?.status);
        return;
    }

    // get item 1
    results = await axios.get(baseUrl+'/1');

    // data correct?
    if (results?.data?.title !== item1.title
        || results?.data?.release_year !== item1.release_year
        || results?.data?.timestamp !== item1.timestamp) {
            console.log("FAILED AT STEP 3");
            console.log(item1);
            console.log(results?.data);
            return;
    }

    // get item 2
    results = await axios.get(baseUrl+'/2');

    // data correct?
    if (results?.data?.title !== item2Update.title
        || results?.data?.release_year !== item2Update.release_year
        || results?.data?.timestamp !== item2Update.timestamp) {
            console.log("FAILED AT STEP 3");
            console.log(item2Update);
            console.log(results?.data);
            return;
    }
    console.log("PASSED");
    await axios.delete(baseUrl);  // reset database

}

async function test2() {

    // test data
    const collection = [
        {
            "title": "Citizen Kane",
            "release_year": 1941,
            "timestamp": "2009-05-12T12:34:56.000"
        },
        {
            "title": "The Godfather",
            "release_year": 1972,
            "timestamp": "2010-04-17T06:41:00.000"
        },
        {
            "title": "Casablanca",
            "release_year": 1942,
            "timestamp": "2011-12-24T23:59:59.999"

        },
        {
            "title": "Gone with the Wind",
            "release_year": 1939,
            "timestamp": "2012-01-01T00:00:00.000"
        }
    ];

    const itemToDelete = 1;

    const collectionAfterDelete = collection.filter((item, index) => index !== itemToDelete-1);



    console.log("Test 2");
    
    // add collection
    let results = await axios.put(baseUrl, collection);

    // added properly?
    if (results?.data?.status !== "REPLACE COLLECTION SUCCESSFUL") {
        console.log("FAILED AT STEP 1");
        console.log(results.data);
        return;
    }

    // get collection
    results = await axios.get(baseUrl);
    
    // data correct?
    if (results.data.length !== collection.length) {
        console.log("FAILED AT STEP 2");
        console.log(collection);
        console.log(results.data);
        return;
    }

    for (let i = 0; i < collection.length; i++) {
        if (results?.data[i]?.title !== collection[i].title
            || results?.data[i]?.release_year !== collection[i].release_year
            || results?.data[i]?.timestamp !== collection[i].timestamp) {
                console.log("FAILED AT STEP 2");
                console.log(i);
                console.log(collection[i]);
                console.log(results?.data[i]);
                return;
            }
    }

    // delete item at id = itemToDelete 
    results = await axios.delete(baseUrl+'/' + itemToDelete);

    // // deleted properly?
    if (results?.data?.status !== "DELETE ITEM SUCCESSFUL") {
        console.log("FAILED AT STEP 3");
        console.log(results?.data?.status);
        return;
    }

    // // get collection
    results = await axios.get(baseUrl);

    // // data correct?
    if (results?.data?.length !== collection.length - 1) {
        console.log("FAILED AT STEP 4");
        console.log(collection);
        console.log(results?.data);
        return;
    }
    for (let i = 0; i < collection.length-1; i++) {
        if (results?.data[i]?.title !== collectionAfterDelete[i].title
            || results?.data[i]?.release_year !== collectionAfterDelete[i].release_year
            || results?.data[i]?.timestamp !== collectionAfterDelete[i].timestamp) {
                console.log("FAILED AT STEP 4");
                console.log(i);
                console.log(collectionAfterDelete[i]);
                console.log(results?.data[i]);
                return;
            }
    }

    // delete collection
    results = await axios.delete(baseUrl);

    // deleted properly?
    if (results?.data?.status !== "DELETE COLLECTION SUCCESSFUL") {
        console.log("FAILED AT STEP 5");
        console.log(results?.data);
        return
    }

    // get collection
    results = await axios.get(baseUrl);

    // data correct?
    if (results?.data?.length !== 0) {
        console.log("FAILED AT STEP 6");
        console.log(results?.data);
        return;
    }

    console.log("PASSED");
    await axios.delete(baseUrl);  // reset database
}