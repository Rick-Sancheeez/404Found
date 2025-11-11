const logo = document.querySelector(".footer-logo");

if (logo) {
  logo.addEventListener("click", (e) => {
    e.preventDefault();
    const parts = window.location.pathname.split("/");
    const project = parts[1] ? `/${parts[1]}/` : "/";
    window.location.href = window.location.origin + project;
  });
}
