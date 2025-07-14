<?php
// api.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

function getBrasilApiData($endpoint) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://brasilapi.com.br/api/$endpoint");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: application/json'
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

$endpoint = $_GET['endpoint'] ?? '';
$data = getBrasilApiData($endpoint);

echo json_encode([
    'status' => 200,
    'data' => $data
]);