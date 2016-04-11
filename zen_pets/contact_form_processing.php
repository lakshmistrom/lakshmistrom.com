<?php

    $name = $_POST['name'];
    $email = $_POST['email'];
    $service = $_POST['service'];
    $refer = $_POST['refer'];
    $comments = $_POST['comments'];

    $g_error = "";

    $valid_refer = array('Facebook', 'Twitter', 'Google', 'Other');
    $valid_service = array('Grooming', 'Adoptions');


    //validate name
    if(empty($name))
    {
        $g_error = appendToError('name', urlencode("You didn't provide you name."), $g_error);
    }
    
    //validate email
    if(empty($email))
    {
        $g_error = appendToError("email", urlencode("You didn't provide your email address."), $g_error);
    }
    else
    {
        if(preg_match('/.*@.*\..*/', $email) == 0)
        {
            $g_error = appendToError("email", urlencode("You didn't provide a valid email address."), $g_error);
        }
    }

    //validate service
    if(empty($service))
    {
        $g_error = appendToError("service", urlencode("You didn't say what we could do for you"), $g_error);
    }
    else if(!in_array($service, $valid_service))
    {
        $g_error = appendToError("service", urlencode("Service not valid."), $g_error);
    }
    
    //validate refer
    if($refer == "null")
    {
        $g_error = appendToError("refer", urlencode("Where did you hear about us?"), $g_error);
    }
    else if(!in_array($refer, $valid_refer))
    {
        $g_error = appendToError("refer", urlencode("Referal not valid."), $g_error);
    }

    $result = "true";
    if(!empty($g_error))
    {
        $result = "false";
    }
    else
    {
        //actually send the email
        $subject = "New contact request from Zen Pet";
        $email = "zenpetssellwood@gmail.com";
        $message = "Name: ".$name."\n".
                   "Email Addres: ".$email."\n".
                   "Service: ".$service."\n".
                   "Referal: ".$refer."\n".
                   "Comments: ".$comments;
        if(!mail($email, $subject, $message))
        {
            //if email sending fails, put an error in the string
            $result = "error";
            $g_error = appendToError("error", urlencode("Could not send email. Please try again."), $g_error);
        }
    }

    header('location:contact.html?result='.$result.$g_error);
    //print "Service: ".$service;

    function appendToError($tag, $value, $currentError)
    {

        $currentError = $currentError.'&'.$tag.'='.$value;
        return $currentError;
    }



?>
