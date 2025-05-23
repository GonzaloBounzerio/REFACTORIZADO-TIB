
<?php
/**
 * Este es el script por donde comienza el sitio, el nombre index.php
 * es una convención estándar como puede serlo index.html
 */

/**
 * Al principio se incluye el archivo de configuración, que en este caso no es
 * una mala práctica porque está muy bien tener la conexión a la base de datos
 * en un solo lugar.
 */
include 'config.php';

/**
 * uso el objeto connection para ejecutar una consulta
 * a la base de datos.
 * query es una función("método") 
 */
$result = $connection->query("SELECT * FROM students");

/**
 * Con echo mostramos por "pantalla" (navegador web)
 * el html al cliente.
 */
echo "<!DOCTYPE html>";
echo "<html lang='es'>";
echo "<head>";
echo "<meta charset='UTF-8'>";
echo "<link rel='stylesheet' href='style.css'>";
echo "</head>";

echo "<body>";
echo "<div class='titlesDiv'>";
echo "<h2 id='mainTitle'>Listado de Estudiantes</h2>";
echo "<a href='insert.php' id='btnAdd' class='buttonClass'>Agregar Nuevo</a><br><br>";
echo "</div>";
if ($result->num_rows > 0) {
    echo "<table id='tableArea' border='1' cellpadding='10'>";
    echo "<tr><th>Nombre</th><th>Email</th><th>Edad</th><th>Acciones</th></tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['fullname']}</td>
                <td>{$row['email']}</td>
                <td>{$row['age']}</td>
                <td>
                    <a href='update.php?id={$row['id']}'>Editar</a> |
                    <a href='delete.php?id={$row['id']}'>Borrar</a>
                </td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "<h3 id='nullData'>No hay estudiantes cargados.</h3>";
}
echo "</body>";
echo "</html>";
?>
