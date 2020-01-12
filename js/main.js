function sendEmail() {
    // Get user subject and message (if provided)
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var destination = "kent.richards@dal.ca";

    // Preserve line breaks in textarea
    message = message.split(/\n/).join("%0D%0A");

    // Generate mailto string (required due to limitations with GitHub pages)
    var mailtoString = "mailto:" + destination + "?subject=" + subject + "&body=" + message;

    // Open the client's local email application using mailto
    window.location.href = mailtoString;
}
