const routes = {
  "/": "/views/home.html",
  "/manufacturing": "/views/manufacturing.html",
  "/maintenance-restoration": "/views/maintenance-restoration.html",
  "/contact": "/views/contact.html",
};

async function navigate(path) {
  const view = routes[path] || routes["/"];

  const app = document.getElementById("app");
  
  // Only add fade effect if app already has content (not first load)
  if (app.innerHTML && document.body.classList.contains('loaded')) {
    app.classList.add('fade-out-content');
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  history.pushState({}, "", path);

  const html = await fetch(view).then(r => r.text());
  app.innerHTML = html;

  window.scrollTo(0, 0);

  app.classList.remove('fade-out-content');
}

document.addEventListener("click", (e) => {
  // Cherche le lien parent avec data-link (remonte dans le DOM)
  const link = e.target.closest("[data-link]");

  if (link) {
    e.preventDefault();
    navigate(link.getAttribute("href"));
  }
});

window.addEventListener("popstate", () => {
  navigate(location.pathname);
});