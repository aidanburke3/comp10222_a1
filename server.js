// I, Aidan Burke, student number 000847978, certify that this material is my
// original work. No other person's work has been used without due
// acknowledgement and I have not made my work available to anyone else.

const e = require('express');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('api.db');
port = 3000;

app.use(express.json());

db.serialize(() => {
    db.run("drop table if exists movies");
    db.run("create table movies (title text, release_year integer, timestamp text)");
    const movies = [
        {
            "title":"Gladiator",
            "release_year":"2000",
            "timestamp":"2017-10-03T11:45:56.200"
        },
        {
            "title":"Avengers: Infinity War",
            "release_year":"2019",
            "timestamp":"2019-12-03T15:20:20.200"
        },
        {
            "title":"Wonder Woman",
            "release_year":"2017",
            "timestamp":"2017-06-04T08:45:56.200"
        }
    ]
    movies.forEach((movie) => {
        db.run("insert into movies (title, release_year, timestamp) values (?,?,?)",
            [movie.title, movie.release_year, movie.timestamp]);
    });
});

app.get('/api', (req, res) => {
    db.all("select * from movies", (err, results) => {
        if (err) {
            res.status(400).json({error: err.message});
        }
        else {
            res.json(results);
        }
    });
});

app.put('/api', (req, res) => {
    const data = req.body;
    db.serialize(() => {
        db.run("drop table if exists movies");
        db.run("create table movies (title text, release_year integer, timestamp text)");
    });
    data.forEach((movie) => {
        db.run("insert into movies (title, release_year, timestamp) values (?,?,?)",
            [movie.title, movie.release_year, movie.timestamp]);
    });
    res.status(200).json({status: "REPLACE COLLECTION SUCCESSFUL"});
});


app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
});