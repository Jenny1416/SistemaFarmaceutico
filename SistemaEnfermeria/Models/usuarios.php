<?php
class Usuario {
    private $conexion;

    public function __construct($db) {
        $this->conexion = $db;
    }

    public function obtenerUsuarioPorCredenciales($id) {
        $query = "SELECT * FROM usuarios WHERE id = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("s", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
?>

