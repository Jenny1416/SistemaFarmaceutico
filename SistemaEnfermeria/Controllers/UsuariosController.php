<?php
require_once '../config/db.php';
require_once '../Models/usuarios.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $rol = $_POST['rol'] ?? '';
    $clave = $_POST['clave'] ?? '';
    $fecha = date('Y-m-d H:i:s');

    if ($nombre && $correo && $rol && $clave) {
        $stmt = $conn->prepare("INSERT INTO usuarios (nombre, correo, rol, clave, fecha_creacion, fecha_actualizacion) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $nombre, $correo, $rol, $clave, $fecha, $fecha);
        $ok = $stmt->execute();
        echo json_encode(['success' => $ok]);
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $filtro = $_GET['filtro'] ?? '';
    $where = '';
    if ($filtro) {
        $filtro = "%$filtro%";
        $where = "WHERE nombre LIKE ? OR correo LIKE ? OR rol LIKE ?";
        $stmt = $conn->prepare("SELECT id, nombre, correo, rol, fecha_actualizacion FROM usuarios $where");
        $stmt->bind_param("sss", $filtro, $filtro, $filtro);
        $stmt->execute();
        $result = $stmt->get_result();
    } else {
        $result = $conn->query("SELECT id, nombre, correo, rol, fecha_actualizacion FROM usuarios");
    }
    $usuarios = [];
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
    echo json_encode(['usuarios' => $usuarios]);
    exit;
}

if (!isset($_POST["id"]) || !isset($_POST["password"])) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
    exit();
}
?>