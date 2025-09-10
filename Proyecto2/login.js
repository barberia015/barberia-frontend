document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailOrUser = document.getElementById("emailOrUser").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailOrUser, password }) // tu backend lo procesa
    });

    const data = await res.json();
    document.getElementById("msg").textContent = data.message;

    if (data.token) {
      localStorage.setItem("token", data.token); // Guardamos el JWT
      window.location.href = "index.html"; // Redirigir a inicio
    }
  } catch (err) {
    console.error("Error en login:", err);
    document.getElementById("msg").textContent = "Error al conectar con el servidor.";
  }

  // Manejo de mensajes de verificación
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");
  const msg = document.getElementById("msg");

  if (status === "success") {
    msg.textContent = "✅ Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión.";
    msg.style.color = "green";
  } else if (status === "fail") {
    msg.textContent = "❌ El enlace de verificación no es válido o expiró.";
    msg.style.color = "red";
  }

});
