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
        
        clone.querySelector('.btn-view').addEventListener('click', function() {
          alert('Ver estudiante: ' + student.codigo);
        });
        clone.querySelector('.btn-edit').addEventListener('click', function() {
          alert('Editar estudiante: ' + student.codigo);
        });
        
        studentsList.appendChild(clone);
      });
    })
    .catch(function(error) {
      console.error('Error cargando estudiantes:', error);
    });

  document.getElementById('addNewStudent').addEventListener('click', function() {
    // Redirige a la página para agregar un nuevo estudiante
    window.location.href = 'nuevo-estudiante.html';
  });
});
