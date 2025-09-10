document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    document.getElementById("msg").textContent = "Las contraseñas no coinciden.";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    document.getElementById("msg").textContent = data.message;
  } catch (err) {
    console.error("Error en registro:", err);
    document.getElementById("msg").textContent = "Error al conectar con el servidor.";
  }
});
