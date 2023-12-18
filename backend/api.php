<?php
require 'db.php';

header('Content-Type: application/json');

// Ejemplo de un punto final para obtener todos los artículos de joyería
$result = $conn->query("SELECT * FROM productos");

$rows = array();
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);
