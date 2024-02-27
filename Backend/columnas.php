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

// Obtener el nombre de la tabla desde Angular
$nombreTabla = $_GET['nombre_tabla'];

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
    // La tabla existe, procede a obtener los nombres de las columnas
    // Consulta SQL para obtener los nombres de las columnas
    $sql = "SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = '$database' AND TABLE_NAME = '$nombreTabla'";

    $result = $conn->query($sql);

    $columnas = array();

    if ($result->num_rows > 0) {
        // Iterar sobre los resultados y almacenar los nombres de las columnas en un arreglo
        while($row = $result->fetch_assoc()) {
            $columnas[] = $row["COLUMN_NAME"];
        }
        // Convertir el arreglo de nombres de columnas a formato JSON y enviar la respuesta
        echo json_encode($columnas);
    } else {
        // La tabla existe pero no tiene columnas
        echo json_encode(array("mensaje" => "La tabla existe pero no tiene columnas."));
    }
} else {
    // La tabla no existe
    echo json_encode(array("mensaje" => "La tabla no existe."));
}

// Cerrar la conexión
$conn->close();
?>