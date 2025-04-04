document.addEventListener("DOMContentLoaded", function() {
  var studentsList = document.getElementById('studentsList');
  var template = document.getElementById('studentCardTemplate');

  window.getStudents()
    .then(function(students) {
      studentsList.innerHTML = '';
      students.forEach(function(student) {
        var clone = template.content.cloneNode(true);
        clone.querySelector('.student-name').textContent = student.nombre;
        clone.querySelector('.student-id').textContent = 'Código: ' + student.codigo;
        clone.querySelector('.student-email').textContent = student.email;
        clone.querySelector('.student-phone').textContent = student.telefono;
        
        // Para el botón "Ver" (sin funcionalidad en este paso)
        // Dentro del código que recorre la lista de estudiantes:
        clone.querySelector('.btn-view').addEventListener('click', function() {
          window.location.href = 'ver-estudiante.html?codigo=' + encodeURIComponent(student.codigo);
        });

        // Botón "Editar" redirige a la página de edición con el código en la query string
        clone.querySelector('.btn-edit').addEventListener('click', function() {
          window.location.href = 'editar-estudiante.html?codigo=' + encodeURIComponent(student.codigo);
        });
        
        studentsList.appendChild(clone);
      });
    })
    .catch(function(error) {
      console.error('Error cargando estudiantes:', error);
    });

  document.getElementById('addNewStudent').addEventListener('click', function() {
    window.location.href = 'nuevo-estudiante.html';
  });
});
