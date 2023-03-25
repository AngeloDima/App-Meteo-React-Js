import React, { useEffect, useState } from 'react';
import './meteo.css'
import { Helmet } from "react-helmet";


<Helmet>
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap"
    rel="stylesheet"
  />
</Helmet>


function Meteo() {

  // creazione delle variabili di stato per conservare i dati che si vogliono visualizzare
  const [temperature, setTemperature] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [humidity, setHumidity] = useState('');
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
        setHumidity(data.main.humidity);

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
    <div className='container-meteo'>


    <div className='UP' >
      <input className='input' type="text" value={city} onChange={handleCityChange} />
    </div>

    {/* DOWN */}
     <div className='downView'>

     {temperature > 1 && 
        <p className='temperatura' >Temperatura: {Math.floor(temperature - 273.15)} C</p>
      }



      <p className='DescMeteo' >Descrizione meteo: {weatherDescription}</p>



      <p className='windSpeed' >Velocità vento: {windSpeed} Km/h</p>



      <p className='umidità' >Umidità: {humidity} %</p>
      

     </div>
      {/* END-DOWN */}



    </div>
  );
}

export default Meteo;
