<?php
// Conecta con la base de datos
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "proyecto";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtiene los datos del formulario
$nombre = $_POST['nombre']; // Asegúrate de que coincida con el nombre del campo en tu formulario
$email = $_POST['email'];
$contrasena = password_hash($_POST['contrasena'], PASSWORD_DEFAULT); // Almacena la contraseña de forma segura

// Prepara y ejecuta la consulta SQL
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nombre, $email, $contrasena);
$result = $stmt->execute();

// Verifica si la inserción fue exitosa
if ($result) {
    echo "Registro exitoso";
} else {
    echo "Error al registrar: " . $stmt->error;
}

// Cierra la conexión
$stmt->close();
$conn->close();
?>
