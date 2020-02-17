window.onload = function() {
    if (localStorage.getItem("state")) {
        document.body.style.backgroundColor = localStorage.getItem("state");
    } else {
        localStorage.setItem("state", "lightgray");
    }
}

function toggleScreenMode() {
    var buttonText = document.getElementById("toggle-button");

    if (document.body.style.backgroundColor === "darkslategray") {
        document.body.style.backgroundColor = "lightgray";
        localStorage.setItem("state", "lightgray");
        buttonText.innerHTML = "Dark Theme";
    } else {
        document.body.style.backgroundColor = "darkslategray";
        localStorage.setItem("state", "darkslategray");
        buttonText.innerHTML = "Light Theme";
    }
}
