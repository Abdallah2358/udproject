function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => {
        console.log("data: 1 ")
        console.log(data)
        return res.json()
        
    })
    .then(function(data) {
        document.getElementById('results').innerHTML = data.message
        console.log("data: 2 ")
        console.log(data)
    })
}

export { handleSubmit }
