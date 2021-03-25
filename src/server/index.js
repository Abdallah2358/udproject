const path = require('path')
const fetch = require('node-fetch');
const express = require('express')
//const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Console } = require('console')
const dotenv = require('dotenv');
const { json } = require('body-parser');
dotenv.config();
/* let json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
} */

const apiKey = process.env.API_KEY   ;

let  recivedText = 'After this, there is no turning back. You take the blue pill - the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill - you stay in Wonderland and I show you how deep the rabbit-hole goes.';
async function postData( url ) 
{
     const response = await fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
  return response.json();
};
 let apiResponse = postData(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&txt=${recivedText}&model=general`)

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

app.get('/test', function (req, res) {
    console.log(apiResponse)
    res.json(apiResponse);

})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
