document.addEventListener("DOMContentLoaded", () => {
  const dias = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const hoy = dias[new Date().getDay()];

  const filas = document.querySelectorAll(".horario-tabla tr");

  filas.forEach((fila) => {
    const diaTexto = fila
      .querySelector("td:first-child")
      .textContent.toLowerCase();
    if (diaTexto === hoy) {
      fila.classList.add("hoy");
    }
  });
});
