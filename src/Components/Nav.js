import React from 'react';
import './Nav.css';

export const Nav = ({ state, send }) => {
  const goToWelcome = () => {
    send('CANCEL')
  }

  return (
    <nav className='Nav'>
      <h1 className='Nav-logo'>Trevel to Space</h1>
      {!state.matches('inicial') && !state.matches('tickets') &&
        <button 
          onClick={goToWelcome} 
          className='Nav-cancel button-secondary'>
            Cancelar
          </button>
      }
    </nav>
  );
}; 