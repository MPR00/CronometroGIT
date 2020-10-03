import React from 'react';
import '../src/cronometro/Cronometro.css';

const Botao = (props) => (
    <button onClick={props.onClick}>{props.label}</button>
  )

  export default Botao