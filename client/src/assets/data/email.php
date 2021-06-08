<?php

header('Content-type: application/json');

$errors = '';

if(empty($errors))
{
	$my_email = 'mahirthebest95@gmail.com';
	$from_name = $_POST['name'];
	$from_email = $_POST['email'];
	$message = $_POST['message'];

	$to_email = $my_email;
	$to_email_cc = $from_email;

	$contact = "<p><strong>Name:</strong> $from_name</p>
		    <p><strong>Email:</strong> $from_email</p>";
	$content = "<p>$message</p>";

	$email_subject = "Neue Nachricht von $from_name erhalten";

	$email_body = '<html><body>';
	$email_body .= "$contact $content";
	$email_body .= '</body></html>';

	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	$headers .= "From: $my_email\n";
	$headers .= "Reply-To: $from_email";

	$result = mail($to_email,$email_subject,$email_body,$headers);
        
        if($result){
                $response_array['status'] = 'success';
                echo json_encode($response_array);
        }else{
                $response_array['status'] = 'error';
                echo json_encode($response_array);
        }
} else {
	$response_array['status'] = 'error';
	echo json_encode($response_array);
}
?>