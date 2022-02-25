const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')
const Sequelize = require('sequelize');

const connection = new Sequelize("mydb","sgroot","4U$uY9DjE79n1rQH", {
    dialect: "mysql",
    host: "SG-mydb-5759-mysql-master.servers.mongodirector.com",
});

const Table = connection.define('house', {
    houseId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    houseNo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

connection.sync({force:true}).then((result) => {
    console.log("Table Created..")
}).then(table => {
    console.log(table)
}).catch((err) => {
    console.log(err);
});

app.use(cors(
    {
        origin: "*",
    }
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )

app.listen(3001,()=>{
    console.log("Port 3001 is running")
})

function display(req,res)
{
    return Table.findAll().then(result => {
        res.json(result)
    }).catch(err => {
        res.json({response: "Database Issue"})
    })
}

app.post('/addhouse',(req,res)=>{
    return Table.create({
        houseId:req.body.houseId,
        houseNo:req.body.houseNo,
        status:req.body.status,
        type:req.body.type
    }).then(result => {
        display(req,res)
    }).catch(err => {
        res.json({response: "Database Issue"})
    })
})

app.get('/deletehouse',(req,res)=>{
    return Table.destroy({where:{houseId:"12211"}}).then(result => {
        display(req,res)
    }).catch(err => {
        res.json({response: "Database Issue"})
    })
})

app.get('/gethouse',(req,res)=>{
    if(typeof req.query.id != "undefined")
    {
        return Table.findOne("12211").then(result => {
            display(req,res)
        }).catch(err => {
            res.json({response: "Database Issue"})
        })
    }
    else
    {
        return Table.findAll().then(result => {
            display(req,res)
        }).catch(err => {
            res.json({response: "Database Issue"})
        })
    }
    
})