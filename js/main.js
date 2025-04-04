import { getStudents } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("estudiantes");
  const template = document.getElementById("student-card");

  try {
    const estudiantes = await getStudents();
    estudiantes.forEach(est => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".nombre").textContent = `${est.nombre} ${est.apellido}`;
      clone.querySelector(".correo").textContent = est.correo;
      clone.querySelector(".programa").textContent = est.programa || "Programa no especificado";
      container.appendChild(clone);
    });
  } catch (error) {
    container.innerHTML = `<p style="color:red;">Error al cargar estudiantes: ${error.message}</p>`;
  }
});
