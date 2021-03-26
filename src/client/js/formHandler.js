function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = { text: document.getElementById('name').value }


    Client.checkForName(formText.text)
    console.log("::: Form Submitted :::");

    postData('/receive', formText).then(

        fetch('http://localhost:8081/test')
            .then(res => {
                return res.json()
            })
            .then(data => {
               document.getElementById('results').innerHTML = `Subjectivity :${data.subjectivity} , Agreement ${data.agreement} , Irony: ${data.irony} ,  Confidence : ${data.confidence} , Score Tag : ${data.score_tag}, ` 
                console.log(data)
            })
    )

}

export { handleSubmit }
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
}
