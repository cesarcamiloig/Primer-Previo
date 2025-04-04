const API_URL = "https://dvkvmjdefaytycdbsntd.supabase.co/rest/v1/estudiantes";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3ZtamRlZmF5dHljZGJzbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjE1MjAsImV4cCI6MjA1OTI5NzUyMH0.wYHbfTAJyIp2CLfU4LcIJfJAMrVq41zUK6kw5GZ01ts";

export async function getStudents() {
  const response = await fetch(API_URL, {
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener los estudiantes");
  }
  return await response.json();
}
