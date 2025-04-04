document.addEventListener("DOMContentLoaded", function() {
    // Extraer el parámetro 'codigo' de la URL
    var params = new URLSearchParams(window.location.search);
    var codigoParam = params.get("codigo");
    if (!codigoParam) {
      alert("No se proporcionó el código del estudiante");
      window.location.href = "estudiantes.html";
      return;
    }
    
    // Cargar los datos del estudiante y mostrarlos
    window.getStudentByCode(codigoParam)
      .then(function(student) {
        if (!student) {
          alert("Estudiante no encontrado");
          window.location.href = "estudiantes.html";
          return;
        }
        document.getElementById('codigo').textContent = student.codigo;
        document.getElementById('nombre').textContent = student.nombre;
        document.getElementById('email').textContent = student.email;
        document.getElementById('telefono').textContent = student.telefono;
        document.getElementById('direccion').textContent = student.direccion;
        document.getElementById('fecha_nacimiento').textContent = student.fecha_nacimiento;
      })
      .catch(function(error) {
        console.error("Error al cargar estudiante:", error);
        alert("Error al cargar estudiante");
        window.location.href = "estudiantes.html";
      });
    
    // Configurar el botón "Volver"
    document.getElementById('backButton').addEventListener("click", function() {
      window.location.href = "estudiantes.html";
    });
  });
  