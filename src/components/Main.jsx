import React from 'react';
import './Main.css'; // estilo separado, opcional

export default function Main({ weather }) {
    if (!weather) {
        return (
            <main className="results">
                <p>Busque por uma cidade para ver o clima.</p>
            </main>
        );
    }

    return (
        <main className="results">
            <div className="weather-card">
                <h2>{weather.name}</h2>
                <p><strong>Latitude:</strong> {weather.lat}</p>
                <p><strong>Longitude:</strong> {weather.lon}</p>
                <p><strong>Temperatura:</strong> {weather.temp} °C</p>
                <p><strong>Sensação térmica:</strong> {weather.feels_like} °C</p>
            </div>
        </main>
    );
}
