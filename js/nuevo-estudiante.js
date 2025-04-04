document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById('newStudentForm');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      var newStudent = {
        codigo: document.getElementById('codigo').value,
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value,
        fecha_nacimiento: document.getElementById('fecha_nacimiento').value
      };
      
      window.createStudent(newStudent)
        .then(function(response) {
          alert('Estudiante creado exitosamente');
          window.location.href = 'estudiantes.html';
        })
        .catch(function(error) {
          console.error('Error al crear estudiante:', error);
          alert('Error al crear estudiante');
        });
    });
    
    document.getElementById('cancelButton').addEventListener('click', function() {
      window.location.href = '../html/estudiantes.html';
    });
  });
  