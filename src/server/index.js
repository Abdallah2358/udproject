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

const apiKey = process.env.API_KEY;

let receivedText ;

let apiResponse;
async function callMeaning(url) {
    console.log("url : "+url)
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.sentence_list[0])
    
    return data.sentence_list[0];
};


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

app.post('/receive', function (request, response) {
    //code
    receivedText = request.body.text;
    //debugging 
    console.log("data received by my server :");
    console.log(receivedText);
});


app.get('/test', function (req, res) {
    callMeaning(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&txt=${receivedText}&model=general`).then(
    (res)=>{
        apiResponse = res
    }
)
    console.log("in fetch " + receivedText)
    res.json(apiResponse);

})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
