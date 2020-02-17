
function updateCounter() {
    var counter = document.getElementById("counter");
    var text = document.getElementsByTagName("textarea")[0].value;
    var length = text.length;

    counter.innerHTML = length + " / 10000";
}

function copyToClipBoard() {
    var text = document.getElementsByTagName("textarea")[0];
    text.select();
    document.execCommand("copy");
}

function manipulate(type) {
    var textarea = document.getElementsByTagName("textarea")[0];
    var text = textarea.value;

    switch (type) {
        case "toUpper":
            text = text.toUpperCase();
            break;
        case "capitalizeFirst":
            text = capitalizeFirst(text.toLowerCase());
            text = text.charAt(0).toUpperCase() + text.substr(1); // regex doesn't get first word
            break;
        case "capitalizeSentences":
            text = capitalizeSentences(text);
            break;
        case "toLower":
            text = text.toLowerCase();
            break;
        case "lowercaseFirst":
            text = lowercaseFirst(text.toUpperCase());
            text = text.charAt(0).toLowerCase() + text.substr(1); // regex doesn't get first word
            break;
        case "alternatingText":
            text = alternateText(text.toUpperCase());
            break;
        default:
            console.log("Error: Unrecognized conversion request.");
            break;
    }

    textarea.value = text;
}

function capitalizeFirst(text) {
    // \s+: grab any instances where one or more space occurs (+ for multiple spaces)
    //  \w: access only word characters ([A-Za-z0-9_]) following the above
    //   g: find all matches, instead of just the first match
    return text.replace(/\s+\w/g, function (text) {
        // capitalize the first character of the word, and then concatenate the rest of the word to the string
        return text.slice(0, text.length - 1) + text.charAt(text.length - 1).toUpperCase();
    });
}

function capitalizeSentences(text) {
    // regex grabs the end character [., !, or ?], the following space[s], and the first character of the next word
    return text.replace(/(?:^|([\.\!\?]\s+))(\w)/g, function (text) {
        // return the end character and space[s], and capitalize the last char of the substring (the first character of the sentence)
        return text.slice(0, text.length - 1) + text.charAt(text.length - 1).toUpperCase();
    });
}

function lowercaseFirst(text) {
    // see function capitalizeFirst for regex explanation
    return text.replace(/\s+\w/g, function (text) {
        // lowercase the first character of the word, and then concatenate the rest of the word to the string
        return text.slice(0, text.length - 1) + text.charAt(text.length - 1).toLowerCase()
    });
}

function alternateText(text) {
    var newText = "";
    var odd = true;
    for (var i = 0; i < text.length; i++) {
        // don't change odd if we are not on a flippable characer (i.e. not alpha)
        while (text.charAt(i).match(/[^a-zA-Z]/)) {
            newText += text.charAt(i);
            i++;
        }

        if (odd == true) {
            newText += text.charAt(i).toLowerCase();
            odd = false;
        } else {
            newText += text.charAt(i)
            odd = true;
        }
    }

    return newText;
}
