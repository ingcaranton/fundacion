<?php


$key ='DC101AB52CF894CEE52F61731643B94F'; //Addcel
$code='ed81fadcaf';//Addcel

$idComercio='1';
$idConcepto='Pago de Prueba';
$idProducto='1001';
$valor='100000.00';
$impuesto = '16';
$valorImpuesto = '16000';
$concepto='Donacion a fundacion Conexion Bienestar';
$moneda = 'COP';
$urlComercio='http://192.155.93.202/phoneapp/post.php';
$urlConfirmacion='http://192.155.93.202/phoneapp/post.php';


$cadena= $moneda.'^'.$idComercio.'^'.$idConcepto.'^'.$code.'^'.$valor.'';


$certificado=base64_encode(tobin(md5($cadena)));

$data ='{"idComercio":'.$idComercio.',"idTipoTransaccion":1,"pagos":1,"idProducto":"'.$idProducto
.'","idConcepto":"'.$idConcepto.'","concepto":"'.$concepto.'","valor":'.$valor.',"impuesto":'.$impuesto.
',"valorImpuesto":'.$valorImpuesto.',"moneda":"'.$moneda.'","secureCode":"ed81fadcaf","certificado":"'
.$certificado.'","urlComercio":"'.$urlComercio.'" ,"urlConfirmacion":"'.$urlConfirmacion.'"}';
 

if($valor>0){
echo encrypt3DES(tobin($key),$data);
}

function encrypt3DES($key, $text){
    $td = mcrypt_module_open (MCRYPT_3DES, '', MCRYPT_MODE_CBC, '');
    //Vector 
     $vector=str_repeat("\0",8);
    // Complete the key
    $key_add = 24-strlen($key);
    $key .= substr($key,0,$key_add);

    // Padding the text
    $text_add = strlen($text)%8;
    for($i=$text_add; $i<8; $i++){
        $text .= chr(8-$text_add);
    }

    mcrypt_generic_init ($td, $key, $vector);
    $encrypt64 = mcrypt_generic ($td, $text);
    mcrypt_generic_deinit($td);
    mcrypt_module_close($td);

     // Return the encrypt text in 64 bits code
    return base64_encode($encrypt64);
}


function decrypt3DES($key, $text){
    $td = mcrypt_module_open (MCRYPT_3DES, '', MCRYPT_MODE_CBC, '');
    //Vector 
     $vector=str_repeat("\0",8);
    // Complete the key
    $key_add = 24-strlen($key);
    $key .= substr($key,0,$key_add);

    // Padding the text
    $text_add = strlen($text)%8;
    for($i=$text_add; $i<8; $i++){
        $text .= chr(8-$text_add);
    }

    mcrypt_generic_init ($td, $key, $vector);
    $encrypt64 = mdecrypt_generic ($td, base64_decode($text));
    mcrypt_generic_deinit($td);
    mcrypt_module_close($td);

     // Return the encrypt text in 64 bits code
    return $encrypt64;
}

function tobin( $target ) {
    $ret = '';

    for ( $i = 0; $i < strlen($target)-1; $i += 2 ) {
        $char=chr( hexdec( $target{ $i + 1 } ) + hexdec( $target{ $i } ) * 16 );        
        $ret .= $char;   
    }
    return $ret;
}

?> 