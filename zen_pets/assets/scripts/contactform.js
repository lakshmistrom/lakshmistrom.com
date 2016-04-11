/**
 * Parses the GET variables out of the provided
 * URL string. Returns associative array with
 * the GET variable name as the key and the
 * variable value as the value.
 * @param url - The URL to parse.
 * @return - Associative array of GET variables.
 */
function parseGetVars(url)
{
    var retVal = {};
    
    var splitUrlArray = url.split("?");
    if(splitUrlArray.length < 2)
    {
        return retVal;
    }

    var params = splitUrlArray[1].split("&");
    for(var i = 0; i < params.length; i++)
    {
        var current = params[i].split("=");
        retVal[current[0]] = current[1];
    }

    return retVal;
}

function urldecode(str) 
{
    return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

$(document).ready(function() {
    //Pull the URL, parse out the variables.
    var url = String(window.location.href);
    var parsed = parseGetVars(url);

    //Look at the contents of the "result" variable. A result
    //of "true" means the email sent. A result of "false" means
    //one or more of the pieces of information did not validate,
    //a variable with the name of the failed field will hold the
    //reason for the failure of that field. More than one error
    //is possible. A result of "error" means
    //the email failed to send and the "error" variable will hold
    //the explanation.
    var result = parsed.result;
    if(result == "true")
    {
        var msg = "Email sent!\nThank you for contacting me. " +
                  "I will get in touch with you as soon as possible.";

        alert(msg);
    }
    else if(result == "false")
    {
        var message = "";
        for(var current in parsed)
        {
            if(current == "result")
                continue;
            
            message += urldecode(parsed[current]) + "\n";
        }
        alert(message);
    }
    else if(result == "error")
    {
        alert(urldecode(parsed.error));
    }
});
