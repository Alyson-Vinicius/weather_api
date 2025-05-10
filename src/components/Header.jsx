import React, { useState } from 'react';
import { searchByCity } from './functional';
import '../App.css';

export default function Header() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const handleSearch = async () => {
        if (!city) {
            alert('Por favor, informe o nome da cidade');
            return;
        }

        const result = await searchByCity(city);
        if (result) {
            setWeather({
                name: city,
                lat: result.coord.lat,
                lon: result.coord.lon,
                temp: result.main.temp,
                feels_like: result.main.feels_like
            });
        }
    };

    return (
        <>
            <header id="header">
                <h1>Weather API</h1>

                <div className="search">
                    <input
                        type="text"
                        placeholder="Digite o nome da cidade"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        />
                    <button onClick={handleSearch}>Buscar</button>
                </div>
                        </header>

            <main className="results">
                {weather && (
                    <div className="weather-card">
                        <h2>{weather.name}</h2>
                        <p><strong>Latitude:</strong> {weather.lat}</p>
                        <p><strong>Longitude:</strong> {weather.lon}</p>
                        <p><strong>Temperatura:</strong> {weather.temp} °C</p>
                        <p><strong>Sensação térmica:</strong> {weather.feels_like} °C</p>
                    </div>
                )}
            </main>
        </>
    );
}
