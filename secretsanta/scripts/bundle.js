 // total number of participants (including removed)
 // current number of participants
var participantCounter = 2, currentCount = 2

// Counter / update email body
var counter = document.getElementById("counter"),
    wrapper = document.getElementById("span1"),
    price = document.getElementById("span2");

counter.addEventListener("input", function(e) {
    if (counter.value === "" || counter.value === "0") {
        wrapper.style.display = "none";
    } else {
        wrapper.style.display = "inline-block";
        price.innerHTML = counter.value;
    }
});

// participantHandler
function addParticipant() {
    var container = document.getElementById("line_four_wrapper");
    var newName = document.createElement("input");
    var newEmail = document.createElement("input");
    var newButton = document.createElement("button");
    var dummyDiv = document.createElement("div");
    var newNameDiv = document.createElement("div");
    var newEmailDiv = document.createElement("div");
    var newButtonDiv = document.createElement("div");

    // create first div, used to position grid correctly
    container.appendChild(dummyDiv);
    dummyDiv.setAttribute("class", participantCounter);
    // create second div, containing the name input field
    container.appendChild(newNameDiv);
    newNameDiv.setAttribute("class", participantCounter);
    newNameDiv.appendChild(newName);
    newName.setAttribute("type", "text");
    newName.setAttribute("placeholder", "Name");
    newName.setAttribute("class", "participant_names");
    newName.required = true;
    // create third div, containing the email input field
    container.appendChild(newEmailDiv);
    newEmailDiv.setAttribute("class", participantCounter);
    newEmailDiv.appendChild(newEmail);
    newEmail.setAttribute("type", "email");
    newEmail.setAttribute("placeholder", "Email Address");
    newEmail.setAttribute("class", "participant_emails");
    newEmail.required = true;
    // create fourth div, containing the remove button
    container.appendChild(newButtonDiv);
    newButtonDiv.setAttribute("class", participantCounter);
    newButtonDiv.appendChild(newButton);
    newButton.setAttribute("class", "remove_participant action");
    newButton.setAttribute("type", "button");
    newButton.setAttribute("onclick", "destroy(this.parentElement.className)");
    newButton.innerHTML += "X";

    participantCounter++;
    currentCount++;
}

function destroy(location) {
    var container = document.getElementById("line_four_wrapper");
    for (var i = 3; i >= 0; i--) {
        var child = container.getElementsByClassName(location)[i];
        container.removeChild(child);
    }

    currentCount--;
}

// matcher
function getParticipants() {
    var organizerName = document.getElementById("organizer_name").value;
    var organizerEmail = document.getElementById("organizer_email").value;
    var particantNames = document.getElementsByClassName("participant_names");
    var particantEmails = document.getElementsByClassName("participant_emails");
    var subject = document.getElementById("subject_line").value;

    var participants = {};
    var givers = [];
    var receivers = [];

    participants = {[organizerName]: organizerEmail};
    givers[0] = organizerName;

    for (var i = 0; i < currentCount; i++) {
        participants[particantNames[i].value] = particantEmails[i].value;
        givers.push(particantNames[i].value);
    }

    givers = shuffle(givers);
    receivers = shift(givers.slice()); // copy givers, then shift receivers down one index

    sendData(participants, givers, receivers, subject);
}

function shuffle(array) {
    // Fisher-Yates (Knuth) Shuffle
    var currentIndex = array.length - 1,
        temporaryValue, randomIndex;

    while (currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

        currentIndex--;
    }

    return array;
}

function shift(array) {
    var temporaryValue;

    temporaryValue = array[0];
    for (var i = 0; i < array.length - 1; i++) {
        array[i] = array[i+1];
    }

    array[array.length-1] = temporaryValue;

    return array;
}

function sendData(participants, givers, receivers, subject) {
    localStorage.setItem("givers", JSON.stringify(givers));
    localStorage.setItem("receivers", JSON.stringify(receivers));
    localStorage.setItem("participants", JSON.stringify(participants));
    localStorage.setItem("subject", JSON.stringify(subject));
    localStorage.setItem("priceLimit", JSON.stringify(counter.value));

    window.location.replace("results.html");
}
