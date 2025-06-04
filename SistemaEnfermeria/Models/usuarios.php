<?php
class Usuario {
    private $conexion;

    public function __construct($db) {
        $this->conexion = $db;
    }

    public function obtenerUsuarios() {
        $query = "SELECT * FROM usuarios";
        $stmt = $this->conexion->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
