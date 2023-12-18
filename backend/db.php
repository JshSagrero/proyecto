<?php
$host = '127.0.0.1';
$username = 'root';
$password = '';
$database = 'proyecto';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
