<?php

// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir los métodos GET, POST, PUT, DELETE y OPTIONS
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Permitir los encabezados Content-Type y Authorization
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$database = "impuestosdb";
$nombreTabla ="Personas";
// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para verificar si la tabla existe
$sql_verificar_tabla = "SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '$database' AND TABLE_NAME = '$nombreTabla'";
$result_verificar_tabla = $conn->query($sql_verificar_tabla);

if ($result_verificar_tabla && $result_verificar_tabla->num_rows > 0) {

// Consulta SQL para obtener datos
$sql = "SELECT personas.CI,personas.nombre,personasnaturales.RUT
FROM personas
INNER JOIN personasnaturales
ON personas.CI=personasnaturales.CI
INNER JOIN impuestoscontribuyentes
ON personasnaturales.RUT=impuestoscontribuyentes.RUT
GROUP BY personas.CI,personas.nombre,personasnaturales.RUT
HAVING COUNT(*) = (SELECT COUNT(*) FROM impuestos);";


$result = $conn->query($sql);

// Crear un arreglo para almacenar los resultados
$elementos = array();

// Obtener resultados y guardarlos en el arreglo
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $elementos[] = $row;
    }
    echo json_encode($elementos);
}

} else {
    // La tabla no existe
    echo json_encode(array("mensaje" => "La tabla no existe."));
}

// Continuación del código anterior...

// Convertir el arreglo a formato JSON y enviar la respuesta
$conn->close();



?>
