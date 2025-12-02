const minimumLoadingTime = 1200;

async function loadComponent(id, file) {
  const html = await fetch(file).then(r => r.text());
  document.getElementById(id).innerHTML = html;
}

async function initApp() {
  const startTime = Date.now();

  await loadComponent("loader-container", "/components/loader.html");

  try {
    await Promise.all([
      loadComponent("header", "/components/header.html"),
      loadComponent("footer", "/components/footer.html"),
      navigate(location.pathname || "/")
    ]);

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
      document.body.classList.add('loaded');
    }, remainingTime);

  } catch (error) {
    console.error('Error loading app:', error);
    document.getElementById('loader-container').innerHTML = '<p>Erreur de chargement</p>';
  }
}

initApp();