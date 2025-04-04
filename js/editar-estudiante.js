document.addEventListener("DOMContentLoaded", function() {
    // Obtener el parámetro 'codigo' de la URL
    var params = new URLSearchParams(window.location.search);
    var codigo = params.get("codigo");
    if (!codigo) {
      alert("No se proporcionó un código de estudiante");
      window.location.href = "estudiantes.html";
      return;
    }
    
    // Cargar los datos del estudiante y prellenar el formulario
    window.getStudentByCode(codigo)
      .then(function(student) {
        if (!student) {
          alert("Estudiante no encontrado");
          window.location.href = "estudiantes.html";
          return;
        }
        document.getElementById('codigo').value = student.codigo;
        document.getElementById('nombre').value = student.nombre;
        document.getElementById('email').value = student.email;
        document.getElementById('telefono').value = student.telefono;
        document.getElementById('direccion').value = student.direccion;
        document.getElementById('fecha_nacimiento').value = student.fecha_nacimiento;
      })
      .catch(function(error) {
        console.error("Error al cargar estudiante:", error);
        alert("Error al cargar estudiante");
        window.location.href = "estudiantes.html";
      });
    
    // Manejar el envío del formulario
    var form = document.getElementById('editStudentForm');
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      var updatedStudent = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value,
        fecha_nacimiento: document.getElementById('fecha_nacimiento').value
      };
      
      window.updateStudent(codigo, updatedStudent)
        .then(function(response) {
          alert("Estudiante actualizado exitosamente");
          window.location.href = "estudiantes.html";
        })
        .catch(function(error) {
          console.error("Error al actualizar estudiante:", error);
          alert("Error al actualizar estudiante");
        });
    });
    
    // Botón cancelar: redirige de vuelta a la lista de estudiantes
    document.getElementById('cancelButton').addEventListener("click", function() {
      window.location.href = "../html/estudiantes.html";
    });
  });
  