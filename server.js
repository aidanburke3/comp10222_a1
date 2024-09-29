// StAuth10222: I Aidan Burke, 000847978 certify that this material is my original work.
// No other person's work has been used without due acknowledgement.
// I have not made my work available to anyone else.

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('api.db');
port = 3000;

app.use(express.json());


// set up db
db.serialize(() => {
    db.run("drop table if exists movies");
    db.run("create table movies (title text, release_year integer, timestamp text)");
});

// GET collection
app.get('/api', (req, res) => {
    db.all("select * from movies", (err, results) => {
        if (err) {
            res.json({error: err.message});
        }
        else {
            res.json(results);
        }
    });
});


// PUT collection
app.put('/api', (req, res) => {
    if(!req.body) {
        res.json({error: "INVALID INPUT"});
        return;
    }
    db.run("delete from movies", (err, results) => {
        if (err) {
            res.json({error: err.message});
        }
        else {
            db.serialize(() => {
                for (let item of req.body) {
                    db.run("insert into movies (title, release_year, timestamp) values (?,?,?)",
                        [item.title, item.release_year, item.timestamp],
                        (err, results) => {
                            if (err) {
                                res.json({error: err.message});
                            }
                        }
                    );
                }
            });
            res.json({status: "REPLACE COLLECTION SUCCESSFUL"});
        }
    });
});

// DELETE collection
app.delete('/api', (req, res) => {
    db.run("delete from movies", (err, results) => {
        if (err) {
            res.json({error: err.message});
        }
        else {
            res.json({status: "DELETE COLLECTION SUCCESSFUL"});
        }
    });
});


// GET single entry
app.get('/api/:id', (req, res) => {
    db.get("select * from movies where rowid = ?", [req.params.id], 
        (err, results) => {
            if (err) {
                res.json({error: err.message});
            }
            else {
                res.json(results);
            }
        }
    );
});

//POST single entry
app.post('/api', (req, res) => {
    const data = req.body;
    if (!data.title || !data.release_year || !data.timestamp) {
        res.json({error: "INVALID INPUT"});
        return;
    }
    db.run("insert into movies (title, release_year, timestamp) values (?,?,?)",
        [data.title, data.release_year, data.timestamp],
        (err, results) => {
            if (err) {
                res.json({error: err.message});
            }
            else {
                res.json({status: "CREATE ENTRY SUCCESSFUL"});
            }
        }
    );
});

// PUT single entry
app.put('/api/:id', (req, res) => {
    const data = req.body;
    if (!data.title || !data.release_year || !data.timestamp) {
        res.json({error: "INVALID INPUT"});
        return;
    }
    db.run("update movies set title=?, release_year=?, timestamp=? where rowid=?",
        [data.title, data.release_year, data.timestamp, req.params.id],
        (err, results) => {
            if (err) {
                res.json({error: err.message});
            }
            else {
                res.json({status: "UPDATE ITEM SUCCESSFUL"});
            }
        }
    );
});

// DELETE single entry
app.delete('/api/:id', (req, res) => {
    db.run("delete from movies where rowid=?", [req.params.id], 
        (err, results) => {
            if (err) {
                res.json({error: err.message});
            }
            else {
                res.json({status: "DELETE ITEM SUCCESSFUL"});
            }
        }
    );
});

// start server
app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
});