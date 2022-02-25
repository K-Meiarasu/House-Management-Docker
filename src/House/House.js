import React from 'react';
import axios from 'axios';

const House = () => {

    const [db, setdb]=React.useState('')
    const House=JSON.stringify({
        "houseId":"12211",
        "houseNo":"121",
        "status":"not booked",
        "type":"2BHK"
    }, null, 2)

    React.useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3001/home',
          }).then((response)=>{
             setdb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });  
    },[])

    function addHouse(){
        axios({
            method: 'post',
            url: 'http://localhost:3001/addhouse',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                "houseId":"12211",
                "houseNo":"121",
                "status":"not booked",
                "type":"2BHK"
            })
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function getHouseByType(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/gethouse?type=2bhk',
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function deleteHouse(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/deletehouse?id=12211',
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function getHouseByID(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/gethouse?id=12211',
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function getHouse(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/gethouse',
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    return (
        <div>
            <div className="body"><br/>
                <pre>{db}</pre><br/>
                <div id='box'>
                    <h2>Add New House</h2>
                    <p>POST - /addhouse</p>
                    <br></br>
                    <h3>Request Body:</h3>
                    <pre>{House}</pre>
                    <button onClick={()=>{addHouse()}}>Send</button>
                </div><br/><hr/><br/>
                <div id='box'>
                    <h2>Get by House type</h2>
                    <p>POST - /gethouse?type=2bhk</p>
                    <br></br>
                    <h3>Request Body:</h3>
                    <button onClick={()=>{getHouseByType()}}>Send</button>
                </div><br/><hr/><br/>
                <div id='box'>
                    <h2>Delete a House</h2>
                    <p>GET - /deletehouse?id=12211</p>
                    <button onClick={()=>{deleteHouse()}}>Send</button>
                </div><br/><hr/><br/>
                <div id='box'>
                    <h2>Get All Houses</h2>
                    <p>GET - /gethouses</p>
                    <button onClick={()=>{getHouse()}}>Send</button>
                </div><br/><hr/><br/>
                <div id='box'>
                    <h2>Get House By ID</h2>
                    <p>GET - /gethouse?id= 121</p>
                    <button onClick={()=>{getHouseByID()}}>Send</button>
                </div><br/>
            </div>
        </div>
    )
}

export default House;