<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Собираем оригинальный URL AGT
//$base = "https://demo.agtsoftware.org/dinit.php";
$base = "https://dev.kolinz.xyz/games/agt/livefruits/init.php";
$query = $_SERVER['QUERY_STRING']; // весь GET как есть
$url = $base . "?" . $query;

//die($url);

// Инициализация cURL
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_PROXY, "127.0.0.1:10808");
curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_USERPWD, 'user1:432');


//curl_setopt($ch, CURLOPT_HEADER, true);

// Передаём нужные заголовки

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "token: 6b878172-667b-5c8d-d525-696f9946defa",
    "tokenuser: 5569752",
    "X-Requested-With: XMLHttpRequest"
]);

// Передаём нужные заголовки
/*
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "token: demo",
    "tokenuser: demo",
    "X-Requested-With: XMLHttpRequest"
]);
*/
// Выполняем запрос
$response = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

// Ошибка запроса к АПИ
if ($err) {
    http_response_code(500);
    echo json_encode(["error" => $err], JSON_UNESCAPED_UNICODE);
    exit;
}
file_put_contents('err.json', $err);
file_put_contents('response.json', $response);
// Возврат клиенту
//echo('<textarea>');
echo $response;
//echo('</textarea>');

