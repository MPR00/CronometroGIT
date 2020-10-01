import React from 'react';
import Contador from './Contador'
import Botao from './Botao'
import LabelRelogio from './LabelRelogio'
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      segundos: 0,
      minutos: 0,
      stop: false,
      nameStop: "Stop",
      name: "CRONOMETRO", 
      parcial: ""
    };
  }
   zerarCronometro() {
      this.state.segundos = -1
      this.state.minutos = 0
      this.state.parcial = ""
   }
  
  parcial(){
    let p = this.state.minutos+ ":"+ this.state.segundos + "\n\n"
    this.state.parcial = this.state.parcial + p 
  }
  
  pararTempo(){
    this.setState({ 
        stop: !this.state.stop 
      })
    if (this.state.stop)
      this.state.nameStop = "Stop"
    else
      this.state.nameStop = "Start"
  }

  incrementar () {
    if (this.state.stop === false){
      this.setState(
         function (state, props) {
          if (state.segundos >= 60){
            this.zerar();
            this.incrementarMinuto(state);
          }  
          return({ segundos: state.segundos +1})
         })
    }
  }
  
  incrementarMinuto (state) {
    this.setState(() => { 
      return {minutos: state.minutos +1}
    })
  };
  
  zerar () {
    this.setState({ 
      segundos: 0 
    })
  }

  componentDidMount(){
    this.timer = setInterval(
      () => this.incrementar(), 1000)
  }
  

  render(){

    return (
      <div class="cronometro-dentro">
        <div class="cabecalho"><LabelRelogio name={this.state.name} /></div>
        <div class="mostrador"><Contador minutos={this.state.minutos} segundos={this.state.segundos} /></div>
        <div class="botao"><Botao onClick={() => this.zerarCronometro()} label={"Zerar"} /></div>
        <div class="botao"><Botao onClick={() => this.pararTempo()} label={this.state.nameStop} /></div>
        <div class="botao"><Botao onClick={() => this.parcial()} label={"Pacial"} /></div>
        <div class="parcial"><LabelRelogio name={this.state.parcial} /></div>
      </div>
    );
  }
}

export default App;