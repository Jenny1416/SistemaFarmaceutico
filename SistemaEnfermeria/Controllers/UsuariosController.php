<?php
require_once '../config/db.php';
require_once '../Models/usuarios.php';

header('Content-Type: application/json');

$usuarios = [];
$result = $conn->query("SELECT id, nombre, correo, rol, fecha_actualizacion FROM usuarios");
while ($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
}
echo json_encode(['usuarios' => $usuarios]);
?>