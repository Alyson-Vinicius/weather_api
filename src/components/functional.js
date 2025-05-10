export async function searchByCity(city) {
    const API_KEY = '1f104e0b728a84302b044d31dcd2fd83';
    const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(ENDPOINT, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        alert('Erro ao buscar dados da cidade');
        console.error(error);
        return null;
    }
}
