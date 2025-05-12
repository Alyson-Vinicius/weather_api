self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Notificação';
  const options = {
    body: data.body || 'Você tem uma nova mensagem.',
    icon: '/android-chrome-192x192.png',
    badge: '/android-chrome-192x192.png'
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Você pode copiar o restante do código de caching do sw.js gerado, se quiser personalizar tudo.
