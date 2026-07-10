function connectUser(button) {

    if (button.innerText === "Connect") {

        button.innerText = "Connected";
        button.style.backgroundColor = "#22c55e";
        button.style.color = "#fff";

    } else {

        button.innerText = "Connect";
        button.style.backgroundColor = "#1469d3";
        button.style.color = "#fff";

    }

}