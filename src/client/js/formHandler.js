
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

    try {
        const newData = await response.json();
        //debugging 
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = {text :document.getElementById('name').value}


    Client.checkForName(formText.text)
    console.log("::: Form Submitted :::");

    postData('/receive', formText).then(
        
        fetch('http://localhost:8081/test')
            .then(res => {
                return res.json()

            })
            .then((data) => {
                document.getElementById('results').innerHTML = `Confidence : ${data.confidence}, Score Tag : ${data.score_tag}, Agreement ${data.agreement}`
                console.log(data)
                //added for jest
                return data;
            })
    )

}

export { handleSubmit }
