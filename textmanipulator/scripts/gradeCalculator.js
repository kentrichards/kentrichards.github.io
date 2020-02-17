function controller(option) {
    var currentGrade, examValue, desiredGrade;

    currentGrade = document.getElementById("currentGrade").value / 100;
    examValue = document.getElementById("examValue").value / 100;
    desiredGrade = document.getElementById("desiredGrade").value / 100;

    if (option === "validate") {
        validateInput(currentGrade, examValue, desiredGrade)
    }  else if (option === "calculate") {
        calculateFinalGrade(currentGrade, examValue, desiredGrade)
    }
}

function validateInput(currentGrade, examValue, desiredGrade) {
    if (!currentGrade) {
        element = document.getElementsByClassName("fa-exclamation-circle")[0].style.display = "inline-block";
        element = document.getElementsByClassName("fa-check")[0].style.display = "none";
    } else {
        element = document.getElementsByClassName("fa-exclamation-circle")[0].style.display = "none";
        element = document.getElementsByClassName("fa-check")[0].style.display = "inline-block";
    }

    if (!examValue) {
        element = document.getElementsByClassName("fa-exclamation-circle")[1].style.display = "inline-block";
        element = document.getElementsByClassName("fa-check")[1].style.display = "none";
    } else {
        element = document.getElementsByClassName("fa-exclamation-circle")[1].style.display = "none";
        element = document.getElementsByClassName("fa-check")[1].style.display = "inline-block";
    }

    if (!desiredGrade) {
        element = document.getElementsByClassName("fa-exclamation-circle")[2].style.display = "inline-block";
        element = document.getElementsByClassName("fa-check")[2].style.display = "none";
    } else {
        element = document.getElementsByClassName("fa-exclamation-circle")[2].style.display = "none";
        element = document.getElementsByClassName("fa-check")[2].style.display = "inline-block";
    }

    if (currentGrade && examValue && desiredGrade) {
        document.getElementsByClassName("green")[0].removeAttribute("disabled");
    }
}

function calculateFinalGrade(currentGrade, examValue, desiredGrade) {
    var requiredGrade;

    if (currentGrade && examValue && desiredGrade) {
        requiredGrade = ((desiredGrade - (currentGrade * (1 - examValue))) / examValue) * 100;
        alert("To get " + desiredGrade * 100 + "% in the class, you need to get " + Math.round(requiredGrade * 10) / 10 + "% on the final exam.\n\nGood luck!");
    } else {
        document.getElementsByClassName("green")[0].setAttribute("disabled", "true");
        validateInput(currentGrade, examValue, desiredGrade);
    }
}
