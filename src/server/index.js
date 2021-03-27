const path = require('path')
const fetch = require('node-fetch');
const express = require('express')
//const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Console } = require('console')
const dotenv = require('dotenv');
const { json } = require('body-parser');
const FormData = require('form-data');
const fs = require('fs');
dotenv.config();
/* let json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
} */

const apiKey = process.env.API_KEY;
console.log(typeof(apiKey))
let receivedText;

/* let apiResponse = { subjectivity: null, irony: null, confidence: null, score_tag: null, agreement: null }
async function callMeaning(url) {
    console.log("ur in calling :" + url)
    const formdata = new FormData();
    formdata.append("key", apiKey);
    formdata.append("url", url);
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then((response) =>{
            return response.json()
        }     
        )
        .then((res) => {
            console.log(`Subjectivity :${res.subjectivity} , Agreement ${res.agreement} , Irony: ${res.irony} ,  Confidence : ${res.confidence} , Score Tag : ${res.score_tag}, `)
            apiResponse.subjectivity = res.subjectivity;
            apiResponse.confidence = res.confidence;
            apiResponse.irony = res.irony;
            apiResponse.agreement = res.agreement;
            apiResponse.score_tag = res.score_tag;
          
        }).then(
            ()=>apiResponse
        )
        .catch(error => console.log('error', error));

};
 */

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

//console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

/* 
app.post('/test', function (req, res) {
    const res = await callMeaning(req.body.url)
    .then(() => {
        console.log("server sending data of :" + req.body.url)
        res.json(apiResponse);
    })

}) */




let apiResponse = { subjectivity: null, irony: null, confidence: null, score_tag: null, agreement: null }
async function callMeaning(req,res,next) {

  try{
    const url = req.body.url
    console.log("ur in calling :" + url)
    const formdata = new FormData();
    formdata.append("key", apiKey);
    formdata.append("url", url);
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);
    let jsonResponse =  await response.json();
    console.log(`Subjectivity :${jsonResponse.subjectivity} , Agreement ${jsonResponse.agreement} , Irony: ${jsonResponse.irony} ,  Confidence : ${jsonResponse.confidence} , Score Tag : ${jsonResponse.score_tag}, `)
    apiResponse.subjectivity = jsonResponse.subjectivity;
    apiResponse.confidence = jsonResponse.confidence;
    apiResponse.irony = jsonResponse.irony;
    apiResponse.agreement = jsonResponse.agreement;
    apiResponse.score_tag = jsonResponse.score_tag;

    console.log("server sending data of :" + req.body.url)
    return res.status(200).json(apiResponse);
  }catch(err){
    console.log(err)
  }

};


app.post('/test', callMeaning)

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


