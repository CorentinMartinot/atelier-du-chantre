const routes = {
  "/": "/views/home.html",
  "/manufacturing": "/views/manufacturing.html",
  "/maintenance-restoration": "/views/maintenance-restoration.html",
  "/contact": "/views/contact.html",
};

let lightboxInitialized = false;

async function navigate(path) {
  const view = routes[path] || routes["/"];
  const app = document.getElementById("app");
  
  if (app.innerHTML && document.body.classList.contains('loaded')) {
    app.classList.add('fade-out-content');
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  history.pushState({}, "", path);

  const html = await fetch(view).then(r => r.text());
  app.innerHTML = html;

  window.scrollTo(0, 0);
  app.classList.remove('fade-out-content');

  if (path === "/manufacturing" && !lightboxInitialized) {
    initLightbox();
    lightboxInitialized = true;
  }
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    navigate(link.getAttribute("href"));
  }
});

window.addEventListener("popstate", () => {
  navigate(location.pathname);
});

function initLightbox() {
  const app = document.getElementById("app");
  const script = app.querySelector("script[init-lightbox]");
  
  if (!script) return;

  const newScript = document.createElement('script');
  newScript.textContent = script.textContent;
  script.parentNode.replaceChild(newScript, script);
}