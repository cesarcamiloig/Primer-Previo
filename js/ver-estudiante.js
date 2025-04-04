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
  
  document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const codigoAlumno = urlParams.get("codigo");

    if (!codigoAlumno) {
        alert("No se encontró el código del estudiante.");
        window.location.href = "estudiantes.html";
    }

    const API_URL = "https://dvkvmjdefaytycdbsntd.supabase.co/rest/v1";
    const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3ZtamRlZmF5dHljZGJzbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjE1MjAsImV4cCI6MjA1OTI5NzUyMH0.wYHbfTAJyIp2CLfU4LcIJfJAMrVq41zUK6kw5GZ01ts";

    // 📌 Función para obtener y mostrar las materias matriculadas
    async function cargarMateriasMatriculadas() {
        const response = await fetch(`${API_URL}/matricula?codigo_alumno=eq.${codigoAlumno}&select=asignatura(*)`, {
            headers: { "apikey": API_KEY, "Authorization": `Bearer ${API_KEY}` }
        });
        const data = await response.json();

        const listaMaterias = document.getElementById("materias-lista");
        const totalCreditosElement = document.getElementById("total-creditos");
        listaMaterias.innerHTML = "";

        let totalCreditos = 0;
        data.forEach(matricula => {
            const materia = matricula.asignatura;
            totalCreditos += materia.creditos;

            const item = document.createElement("li");
            item.textContent = `${materia.nombre} (${materia.creditos} créditos)`;
            listaMaterias.appendChild(item);
        });

        totalCreditosElement.textContent = `Total de créditos: ${totalCreditos}`;
        return totalCreditos;
    }

    // 📌 Función para cargar todas las materias disponibles
    async function cargarMateriasDisponibles() {
        const response = await fetch(`${API_URL}/asignatura`, {
            headers: { "apikey": API_KEY, "Authorization": `Bearer ${API_KEY}` }
        });
        const data = await response.json();

        const selectMaterias = document.getElementById("seleccionar-materia");
        selectMaterias.innerHTML = `<option value="">Seleccione una materia</option>`;

        data.forEach(materia => {
            const option = document.createElement("option");
            option.value = materia.codigo;
            option.textContent = `${materia.nombre} (${materia.creditos} créditos)`;
            option.dataset.creditos = materia.creditos;
            selectMaterias.appendChild(option);
        });
    }

    // 📌 Función para matricular una nueva materia
    async function matricularMateria() {
        const selectMaterias = document.getElementById("seleccionar-materia");
        const materiaSeleccionada = selectMaterias.value;
        const mensajeError = document.getElementById("mensaje-error");

        if (!materiaSeleccionada) {
            mensajeError.textContent = "Seleccione una materia válida.";
            mensajeError.style.display = "block";
            return;
        }

        const creditosMateria = parseInt(selectMaterias.options[selectMaterias.selectedIndex].dataset.creditos);
        const totalCreditos = await cargarMateriasMatriculadas();

        if (totalCreditos + creditosMateria > 14) {
            mensajeError.textContent = "No puedes matricular más de 14 créditos.";
            mensajeError.style.display = "block";
            return;
        }

        // Enviar solicitud para matricular
        const response = await fetch(`${API_URL}/matricula`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": API_KEY,
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                codigo_alumno: codigoAlumno,
                codigo_asignatura: materiaSeleccionada
            })
        });

        if (response.ok) {
            alert("Materia matriculada con éxito.");
            cargarMateriasMatriculadas();
        } else {
            mensajeError.textContent = "Error al matricular la materia.";
            mensajeError.style.display = "block";
        }
    }

    // 📌 Cargar datos iniciales
    cargarMateriasMatriculadas();
    cargarMateriasDisponibles();

    // 📌 Evento para matricular
    document.getElementById("btn-matricular").addEventListener("click", matricularMateria);
});