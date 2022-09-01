import React, { useState } from 'react';
import './Search.css';

export const Search = ({state, send }) => {
  const [flight, setFlight] = useState('');

  const goToPassengers = () => {
    send('CONTINUE', {selectedCountry: flight})
  }

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  const options = state.context.countries;
  // console.log('options log', options[0].name.common);

  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <select id="country" className='Search-select' value={flight} onChange={handleSelectChange}>
        <option value="" disabled defaultValue>A que planeta viajar</option>
        {options.map((options) => <option value={options.name.common} key={options.name.common}>{options.name.common}</option>)}
      </select>
      <button 
        onClick={goToPassengers} 
        disabled={flight === ''} 
        className='Search-continue button'>
          Continuar
        </button>
    </div>
  );
}; 