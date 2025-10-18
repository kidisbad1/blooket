new Promise(async () => {
    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    window.alert = iframe.contentWindow.alert;

    // Create and append the "Made by NICK" box
    let messageBox = document.createElement('div');
    messageBox.innerHTML = "Made by NICK";
    messageBox.style.position = 'absolute';
    messageBox.style.top = '100px';
    messageBox.style.left = '20px';
    messageBox.style.padding = '20px';
    messageBox.style.backgroundColor = '#003366';
    messageBox.style.border = '5px solid black';
    messageBox.style.borderRadius = '15px';
    messageBox.style.fontSize = '24px';
    messageBox.style.fontWeight = 'bold';
    messageBox.style.fontFamily = 'Arial, sans-serif';
    messageBox.style.color = 'white';
    document.body.appendChild(messageBox);

    // Create and append the "Found Game Pins" box
    let foundCodesBox = document.createElement('div');
    foundCodesBox.innerHTML = "<strong>Found Codes:</strong><br>";
    foundCodesBox.style.position = 'absolute';
    foundCodesBox.style.top = '200px';
    foundCodesBox.style.left = '20px';
    foundCodesBox.style.padding = '20px';
    foundCodesBox.style.height = '500px';
    foundCodesBox.style.overflowY = 'auto';
    foundCodesBox.style.backgroundColor = '#003366';
    foundCodesBox.style.border = '5px solid black';
    foundCodesBox.style.borderRadius = '15px';
    foundCodesBox.style.fontSize = '24px';
    foundCodesBox.style.fontWeight = 'bold';
    foundCodesBox.style.fontFamily = 'Arial, sans-serif';
    foundCodesBox.style.color = 'white';
    document.body.appendChild(foundCodesBox);

    let workingPins = [];
    let code = Math.floor(Math.random() * 8999999 + 1000000);

    console.log("Starting fast game pin search");

    const fetchGame = async (code) => {
        const response = await fetch(`https://fb.blooket.com/c/firebase/id?id=${code}`, {
            credentials: "include"
        });

        const res = await response.text();
        const data = JSON.parse(res);

        console.log("Checking Pin: " + code);

        if (data.success) {
            console.log("%cGame Found with Pin: " + code, "color: green");
            workingPins.push(code);
            let newPinElement = document.createElement('div');
            newPinElement.innerHTML = code;
            foundCodesBox.appendChild(newPinElement);
        } else {
            console.log("%caww no game found", "color: red");
        }
    };

    setInterval(async () => {
        await fetchGame(code);
        code = Math.floor(Math.random() * 9000000 + 1000000);
    }, 200);

    setInterval(() => {
        foundCodesBox.innerHTML = "<strong>Found Codes:</strong><br>";
        workingPins.forEach(pin => {
            let newPinElement = document.createElement('div');
            newPinElement.innerHTML = pin;
            foundCodesBox.appendChild(newPinElement);
        });
    }, 10000);
});
