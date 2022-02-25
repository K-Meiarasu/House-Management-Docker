const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3001;
const connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    port: 
})
try
{
    var sql = "SHOW TABLES LIKE 'house'";
    connection.query(sql, function (err, result) {
        if(result.length === 0)
        {
            var sql = "CREATE TABLE house (houseId VARCHAR(255), houseNo VARCHAR(255),  status VARCHAR(255), houseType VARCHAR(255), PRIMARY KEY (houseId))";
            connection.query(sql, function (err, result) {
                console.log("Table created");
            });
        }
        else{
            console.log("Table already exists")
        }
    });
}
catch(e)
{
    console.log(e)
}

app.use(cors(
    {
        origin: "*",
    }
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )

app.listen(port,()=>{
    console.log("Port 3001 is running")
})

function display(req,res)
{
    var sql = "SELECT * from house"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
           res.json(result)
        }
        console.log(result)
    });
}

app.get('/home',(req,res)=>{
    display(req,res)
})

app.post('/addhouse',(req,res)=>{
    console.log(req.body)
    var sql = "INSERT INTO house (houseId, houseNo, status, houseType) VALUES ("+"'"+ req.body.houseId+"'" +","+"'"+req.body.houseNo+"'"+", "+"'"+req.body.status+"'"+",  "+"'"+req.body.houseType+"'"+")"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            display(req,res)
        }
    });
})

app.get('/gethouse',(req,res)=>{
    console.log(req.query.id)
    if(typeof req.query.id != "undefined")
    {
        var sql = "SELECT * from house WHERE houseType=2bhk"
    }
    else
    {
        var sql = "SELECT * from house"
    }
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            res.json(result)
        }
        console.log(result)
    });
})

app.get('/deletehouse',(req,res)=>{
    var sql = "DELETE FROM house"+" WHERE houseId="+"'"+req.query.id+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            display(req,res)
        }
    });
})

app.get('/gethouse',(req,res)=>{
    console.log(req.query.id)
    if(typeof req.query.id != "undefined")
    {
        var sql = "SELECT * from house WHERE houseId=12212"
    }
    else
    {
        var sql = "SELECT * from house"
    }
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            res.json(result)
        }
        console.log(result)
    });
})
