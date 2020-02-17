var givers = localStorage.getItem("givers"),
    receivers = localStorage.getItem("receivers"),
    participants = localStorage.getItem("participants"),
    subject = localStorage.getItem("subject"),
    priceLimit = parseInt(localStorage.getItem("priceLimit")),
    xhttp = new XMLHttpRequest();

window.onload = function () {
    givers = JSON.parse(localStorage.getItem("givers"));
    receivers = JSON.parse(localStorage.getItem("receivers"));
    participants = JSON.parse(localStorage.getItem("participants"));

    var dump = document.getElementById("display_data");

    for (var i = 0; i < givers.length; i++) {
        dump.innerHTML += "<b>" + givers[i] + " (" + participants[givers[i]] + ")" + "</b> matched with <b>" + receivers[i] + "</b>!<br>";
    }
}

function toggleResults() {
    var results = document.getElementById("display_data");

    if (results.style.display === "block") {
        results.style.display = "none";
    } else {
        results.style.display = "block";
    }
}

function sendToServer() {
    alert("This button should send JSON data to mailer.py, clear localStorage, and redirect to either success.html or failure.html, depending on the result of the data transfer.");
    // xhttp.open("POST", "serverside/mailer.py", true);
    // xhttp.send(givers, receivers, participants, subject, priceLimit);
    // xhttp.close();

    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         window.location.replace("success.html");
    //     }
    // }
}
