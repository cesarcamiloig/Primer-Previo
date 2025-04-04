var API_URL = 'https://dvkvmjdefaytycdbsntd.supabase.co/rest/v1';
var API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3ZtamRlZmF5dHljZGJzbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjE1MjAsImV4cCI6MjA1OTI5NzUyMH0.wYHbfTAJyIp2CLfU4LcIJfJAMrVq41zUK6kw5GZ01ts';

function getStudents() {
  return fetch(API_URL + '/alumno?select=*', {
    headers: {
      'apikey': API_KEY,
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Error al obtener estudiantes');
    }
    return response.json();
  });
}

// Se expone la función globalmente
window.getStudents = getStudents;
