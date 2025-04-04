document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById('newStudentForm');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      var newStudent = {
        codigo: document.getElementById('codigo').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        direccion: document.getElementById('direccion').value.trim(),
        fecha_nacimiento: document.getElementById('fecha_nacimiento').value
      };
      
      // Opcional: Validar que los campos requeridos no estén vacíos
      if (!newStudent.codigo || !newStudent.nombre || !newStudent.email || !newStudent.telefono) {
        alert("Por favor, completa todos los campos requeridos");
        return;
      }
      
      window.createStudent(newStudent)
        .then(function(response) {
          alert('Estudiante creado exitosamente');
          window.location.href = 'estudiantes.html';
        })
        .catch(function(error) {
          console.error('Error al crear estudiante:', error);
          alert('Error al crear estudiante: ' + error.message);
        });
    });
    
    document.getElementById('cancelButton').addEventListener('click', function() {
      window.location.href = 'estudiantes.html';
    });
  });
  