<?php
require_once '../config/db.php';
require_once '../Models/usuarios.php';

header('Content-Type: application/json');

$usuarioModel = new Usuario($conn);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener todos los usuarios
    $query = "SELECT id, nombre, rol, correo, fecha_actualizacion, estado FROM usuarios";
    $result = $conn->query($query);
    $usuarios = [];
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
    echo json_encode(['usuarios' => $usuarios]);
    exit;
}
?>