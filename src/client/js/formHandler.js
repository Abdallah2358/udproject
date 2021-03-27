function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = { url : document.getElementById('name').value }


    if ( !(Client.checkForName(formText.url)) ) {
        console.log("Not a valid url ");
       return 0 

    }  
    console.log("::: Form Submitted :::" + formText.url);
    document.getElementById('results').innerHTML =  'loading data from api please wait'
    fetch('http://localhost:8081/test', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify( formText )// body data type must match "Content-Type" header
    })
        .then(res => {
            return res.json()
        })
        .then(data => {
            document.getElementById('results').innerHTML = `Subjectivity :${data.subjectivity} , Agreement ${data.agreement} , Irony: ${data.irony} ,  Confidence : ${data.confidence} , Score Tag : ${data.score_tag}`
            console.log(data)
        })


}

export { handleSubmit }
