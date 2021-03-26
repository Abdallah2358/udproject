function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let curses = [
        'death',
        'kill',
        'idiot',
        'stupid',
        'donkey',
        'kys',
        'kill yourself',
        'noob'
    ]

    if(curses.includes(inputText)) {
        alert("No cursing")
    }
}

export { checkForName }
