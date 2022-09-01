import React, { useState } from 'react';
import './Passengers.css';

export const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState('');
  //no anda por algun motivo
  // const passengers = state.context;


  const onChangeInput = (e) => {
    changeValue(e.target.value);
  }

  const goToTicket = () => {
    send('DONE')
  }

  const submit = (e) => {
    e.preventDefault();
  //Envio el evento de ADD (agregar), le paso el newPassengers junto con el valor del formulario
    send('ADD', {newPassengers: value})
    changeValue('');
  }

 
  

  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van al espacio </p>
      {/* {passengers.map((person, index)=> <p key={`person-${index}`} >{person}</p> )} */}
      <input 
        id="name" 
        name="name" 
        type="text" 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-add button-secondary'
          type="submit"
        >
          Agregar Pasajero
        </button>
        <button
          className='Passenger-pay button'
          type="button"
          onClick={goToTicket}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};