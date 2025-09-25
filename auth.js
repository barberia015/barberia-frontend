document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const msg = document.getElementById("msg");

  // --- Registro ---
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        msg.textContent = "❌ Las contraseñas no coinciden.";
        msg.style.color = "red";
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        msg.textContent = data.msg || data.message;
        msg.style.color = res.ok ? "green" : "red";
      } catch (error) {
        console.error("Error en registro:", error);
        msg.textContent = "Error al conectar con el servidor.";
        msg.style.color = "red";
      }
    });
  }

  // --- Login ---
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const emailOrUser = document.getElementById("emailOrUser").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailOrUser, password }),
        });

        const data = await res.json();

        if (res.ok && data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username); // 👈 guardamos el nombre
          window.location.href = "index.html"; // Redirige tras login
        } else {
          msg.textContent = "❌ " + (data.msg || data.message);
          msg.style.color = "red";
        }
      } catch (error) {
        console.error("Error en login:", error);
        msg.textContent = "Error al conectar con el servidor.";
        msg.style.color = "red";
      }

      // --- Mensajes de verificación desde query params ---
      const params = new URLSearchParams(window.location.search);
      const status = params.get("status");

      if (status === "success") {
        msg.textContent =
          "✅ Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión.";
        msg.style.color = "green";
      } else if (status === "fail") {
        msg.textContent = "❌ El enlace de verificación no es válido o expiró.";
        msg.style.color = "red";
      }
    });
  }

  // --- Panel de Perfil ---
  const profileIcon = document.getElementById("profile-icon"); // desktop
  const profileIconMobile = document.getElementById("profile-icon-mobile"); // móvil

  const profilePanel = document.getElementById("profile-panel"); // desktop
  const profilePanelMobile = document.getElementById("profile-panel-mobile"); // móvil

  const logoutBtn = document.getElementById("logout-btn");
  const logoutBtnMobile = document.getElementById("logout-btn-mobile");

  const welcomeMessage = document.getElementById("welcome-message");
  const welcomeMessageMobile = document.getElementById(
    "welcome-message-mobile"
  );

  // Cargar nombre si existe
  const username = localStorage.getItem("username");
  if (username) {
    if (welcomeMessage)
      welcomeMessage.textContent = `¡Bienvenido, ${username}!`;
    if (welcomeMessageMobile)
      welcomeMessageMobile.textContent = `¡Bienvenido, ${username}!`;

    if (profileIcon) profileIcon.href = "#";
    if (profileIconMobile) profileIconMobile.href = "#";
  }

  // Función para abrir/cerrar panel
  function toggleProfilePanel(e, panel) {
    if (localStorage.getItem("token")) {
      e.preventDefault();
      panel.classList.toggle("hidden");
      panel.classList.toggle("show");
    }
  }

  // Eventos en ambos iconos
  if (profileIcon && profilePanel) {
    profileIcon.addEventListener("click", (e) =>
      toggleProfilePanel(e, profilePanel)
    );
  }
  if (profileIconMobile && profilePanelMobile) {
    profileIconMobile.addEventListener("click", (e) =>
      toggleProfilePanel(e, profilePanelMobile)
    );
  }

  // Cerrar sesión
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "index.html";
    });
  }

  if (logoutBtnMobile) {
    logoutBtnMobile.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "index.html";
    });
  }
});
