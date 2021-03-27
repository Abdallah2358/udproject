function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);

    if (!(inputText.includes('https') || inputText.includes('https'))) {
        alert("Not a valid url ")
        return 0
    }
    return 1
}

export { checkForName }
