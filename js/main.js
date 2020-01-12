function sendEmail() {
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var destination = "kent.richards@dal.ca";

    var mailtoString = "mailto:" + destination + "?subject=" + subject + "&body=" + message;

    window.location.href = mailtoString;
}