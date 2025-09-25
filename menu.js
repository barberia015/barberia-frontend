document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const sideMenu = document.getElementById("side-menu");
  const closeMenu = document.getElementById("close-menu");

  if (menuToggle && sideMenu && closeMenu) {
    menuToggle.addEventListener("click", () => {
      sideMenu.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
      sideMenu.classList.remove("active");
    });
  }
});
