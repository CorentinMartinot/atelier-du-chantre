async function loadComponent(id, file) {
  const html = await fetch(file).then(r => r.text());
  document.getElementById(id).innerHTML = html;
}

async function initApp() {
  await loadComponent("header", "/components/header.html");
  await loadComponent("footer", "/components/footer.html");

  navigate(location.pathname || "/");
}

initApp();