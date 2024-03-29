<?php

session_cache_limiter('nocache');
header('Expires: ' . gmdate('r', 0));

header('Content-type: application/json');

require_once 'php-mailer/PHPMailerAutoload.php';

// Step 1 - Enter your email address below.
$email = 'portfoliomails907537@gmail.com';

// If the e-mail is not working, change the debug option to 2 | $debug = 2;
$debug = 0;

$subject = $_POST['callSubject'];

$fields = [
    0 => [
        'text' => 'Name',
        'val' => $_POST['callName'],
    ],
    1 => [
        'text' => 'Email address',
        'val' => $_POST['email'],
    ],
    2 => [
        'text' => 'Message',
        'val' => $_POST['message'],
    ],
];

$message = '';

foreach ($fields as $field) {
    $message .=
        $field['text'] .
        ': ' .
        htmlspecialchars($field['val'], ENT_QUOTES) .
        "<br>\n";
}

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = $debug; // Debug Mode

    // Step 2 (Optional) - If you don't receive the email, try to configure the parameters below:

    $mail->IsSMTP(); // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com'; // Specify main and backup server
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->Username = 'portfoliomails907537@gmail.com'; // SMTP username
    $mail->Password = 'S@muel@907537'; // SMTP password
    $mail->SMTPSecure = 'tls'; // Enable encryption, 'ssl' also accepted
    $mail->Port = 587; // TCP port to connect to

    $mail->AddAddress($email); // Add another recipient

    //$mail->AddAddress('person2@domain.com', 'Person 2');     // Add a secondary recipient
    //$mail->AddCC('person3@domain.com', 'Person 3');          // Add a "Cc" address.
    //$mail->AddBCC('person4@domain.com', 'Person 4');         // Add a "Bcc" address.

    $mail->SetFrom($email, $_POST['callName']);
    $mail->AddReplyTo($_POST['email'], $_POST['callName']);

    $mail->IsHTML(true); // Set email format to HTML

    $mail->CharSet = 'UTF-8';

    $mail->Subject = $subject;
    $mail->Body = $message;

    $mail->Send();
    $arrResult = ['response' => 'success'];
} catch (phpmailerException $e) {
    $arrResult = ['response' => 'error', 'errorMessage' => $e->errorMessage()];
} catch (Exception $e) {
    $arrResult = ['response' => 'error', 'errorMessage' => $e->getMessage()];
}

if ($debug == 0) {
    echo json_encode($arrResult);
}
