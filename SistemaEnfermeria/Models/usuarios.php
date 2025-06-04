<?php
class Usuario {
    private $conexion;

    public function __construct($db) {
        $this->conexion = $db;
    }

    public function obtenerUsuarioPorCredenciales($correo) {
        $query = "SELECT * FROM usuarios WHERE correo = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
?>