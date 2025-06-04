<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require_once '../config/db.php';
require_once '../Models/usuarios.php'; // Asegúrate que el nombre y ruta coincidan

class AuthController {
    private $usuarioModel;

    public function __construct($db) {
        $this->usuarioModel = new Usuario($db);
    }

    public function login($id, $clave) {
        $usuario = $this->usuarioModel->obtenerUsuarioPorCredenciales($id);

        // Comparación directa de la clave (sin hash)
        if ($usuario && $clave === $usuario['clave']) {
            $_SESSION['usuario'] = [
                'id' => $usuario['id'],
                'nombre' => $usuario['nombre'],
                'correo' => $usuario['correo'],
                'rol' => $usuario['rol']
            ];
            $_SESSION['registro_actividad'] = [];

            $this->registrarActividad("Inicio de sesión");

            echo json_encode(['success' => true, 'usuario' => $_SESSION['usuario']]);
            exit();
        } else {
            echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
            exit();
        }
    }

    public function registrarActividad($accion) {
        $_SESSION['registro_actividad'][] = [
            "accion" => $accion,
            "fecha" => date("Y-m-d H:i:s")
        ];
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header('Content-Type: application/json');
    if (!isset($_POST["id"]) || !isset($_POST["password"])) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos']);
        exit();
    }
    $authController = new AuthController($conn);
    $authController->login($_POST["id"], $_POST["password"]);
}
?>
