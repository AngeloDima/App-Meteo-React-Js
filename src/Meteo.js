import React, { useEffect, useState } from 'react';

function Meteo() {

  // creazione delle variabili di stato per conservare i dati che si vogliono visualizzare
  const [temperature, setTemperature] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [pressure, setPressure] = useState('');
  const [city, setCity] = useState('');

  // definizione dell'URL dell'API
  const apiKey = '4a52366701f0101fa1a4e38f993f089a';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
  useEffect(() => {
    // esecuzione della richiesta all'API all'avvio del componente
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // analisi dell'oggetto JSON restituito dall'API e impostazione degli stati delle variabili
        setTemperature(data.main.temp);
        setWeatherDescription(data.weather[0].description);
        setWindSpeed(data.wind.speed);
        setPressure(data.main.pressure);

        // visualizzazione dell'oggetto JSON sulla console del browser
        console.log(data);
      })
      .catch(error => console.error(error));
  }, [city]);
  
  // funzione per gestire l'input dell'utente per la città
  const handleCityChange = event => {
    setCity(event.target.value);
  };

  // stampa dei valori delle variabili di stato nel return del componente
  return (
    <div>
      <input type="text" value={city} onChange={handleCityChange} />
      {temperature > 1 && 
        <p>Temperature: {Math.floor(temperature - 273.15)}</p>
      }
      <p>Weather Description: {weatherDescription}</p>
      <p>Wind Speed: {windSpeed} Km/h</p>
      <p>Pressure: {pressure}</p>
    </div>
  );
}

export default Meteo;
