// StAuth10222: I Aidan Burke, 000847978 certify that this material is my original work.
// No other person's work has been used without due acknowledgement.
// I have not made my work available to anyone else.

const axios = require('axios');

const baseUrl = 'http://localhost:3000/api';

// run tests
test1();

test2();


async function test1() {
    var testPassed = {
        "step1": true,
        "step2": true,
        "step3": true
    }
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
        "timestamp":"2010-12-03T18:20:20.200"
    };
    var results = await Promise.all([
        axios.post(baseUrl, item1), 
        axios.post(baseUrl, item2),
        axios.put(baseUrl+'/2', item2Update),
        axios.get(baseUrl+'/1'),
        axios.get(baseUrl+'/2')
    ]);

    if (results[0].data.status !== "CREATE ENTRY SUCCESSFUL" 
        || results[1].data.status !== "CREATE ENTRY SUCCESSFUL") {
            testPassed.step1 = false;
    }

    if (results[2].data.status !== "UPDATE ITEM SUCCESSFUL") {
        testPassed.step2 = false;
    }
    console.log(results[3].data);
    if (results[3].data.title !== item1.title
        || results[3].data.release_year !== item1.release_year
        || results[3].data.timestamp !== item1.timestamp) {
            testPassed.step3 = false;
    }
    console.log(results[4].data);
    if (results[4].data.title !== item2Update.title
        || results[4].data.release_year !== item2Update.release_year
        || results[4].data.timestamp !== item2Update.timestamp) {
            testPassed.step3 = false;
    }
    console.log(testPassed);

    console.log(testPassed.step1 && testPassed.step2 && testPassed.step3 ? "PASSED" : "FAILED");

}

async function test2() {
    var testPassed = {
        "step1": true,
        "step2": true,
        "step3": true,
        "step4": true,
        "step5": true,
        "step6": true
    }

    console.log("Test 2");

    // TODO: implement test 2


    console.log(testPassed.step1 && testPassed.step2 && testPassed.step3 && testPassed.step4 && testPassed.step5 && testPassed.step6 ? "PASSED" : "FAILED");
}