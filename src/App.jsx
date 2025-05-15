import React, { useEffect } from 'react';
import Header from './components/Header.jsx'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i)
    outputArray[i] = rawData.charCodeAt(i);

  return outputArray;
}

function sendNotification() {
  fetch('http://localhost:4000/send-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Controll-Allow-Origin': '*'
    }
  });
}

export default function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Permissão para notificações concedida!');

          navigator.serviceWorker.register('/custom-sw.js').then(registration => {
            console.log('Service Worker registrado:', registration);

            // Substitua pela sua chave pública VAPID gerada no servidor
            const vapidPublicKey = '__PUBLIC_KEY__';
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

            registration.pushManager.getSubscription().then(subscription => {
              if (subscription) {
                console.log('Já inscrito para push:', subscription);
                return subscription;
              }

              return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
              });
            }).then(newSubscription => {
              console.log('Nova inscrição para push:', JSON.stringify(newSubscription));
              fetch('http://localhost:4000/subscribe', {
                method: 'POST',
                body: JSON.stringify(newSubscription),
                headers: {
                  'Content-Type': 'application/json',
                  'Allow-Controll-Allow-Origin': '*'
                }
              });
              // Aqui você deve enviar a subscription para seu servidor para armazenar e enviar push
            });
          }).catch(error => {
            console.error('Falha ao registrar service worker:', error);
          });
        } else {
          console.log('Permissão para notificações negada');
        }
      });
    } else {
      console.warn('Push messaging não é suportado neste navegador.');
    }
  }, []);

  return (
    <>
      <Header />
      <button onClick={sendNotification}>
        Enviar notificação
      </button>
    </>
  );
}
