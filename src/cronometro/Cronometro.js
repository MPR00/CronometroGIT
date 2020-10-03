import React from 'react'
import Contador from '../Contador'
import Botao from '../Botao'
import LabelRelogio from '../LabelRelogio'
import './Cronometro.css';

class Cronometro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      segundos: 0,
      minutos: 0,
      stop: false,
      nameStop: "Stop",
      name: "CRONOMETRO",
      parcial: "",
      series: [],
      interval: null
    };
  }

  iniciarCronometro() {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }

    const interval = setInterval(() => {
      this.setState({ tempo: this.state.tempo + 1 });
    }, 1000);

    this.setState({ interval });
  }

  zerarCronometro() {
    this.state.segundos = -1
    this.state.minutos = 0
    this.state.parcial = ""
  }

  parcial() {
    let p = this.state.minutos + ":" + this.state.segundos + "\n\n"
    this.state.parcial = this.state.parcial + p
  }

  adicionarSerie() {
    const series = this.state.series.concat([this.state.tempo])

    this.setState({ series })
  }

  pararTempo() {
    this.setState({
      stop: !this.state.stop
    })
    if (this.state.stop)
      this.state.nameStop = "Stop"
    else
      this.state.nameStop = "Start"
  }

  incrementar() {
    if (this.state.stop === false) {
      this.setState(
        function (state, props) {
          if (state.segundos >= 60) {
            this.zerar();
            this.incrementarMinuto(state);
          }
          return ({ segundos: state.segundos + 1 })
        })
    }
  }

  incrementarMinuto(state) {
    this.setState(() => {
      return { minutos: state.minutos + 1 }
    })
  };

  zerar() {
    this.setState({
      segundos: 0
    })
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.incrementar(), 1000)
  }

  render() {

    return (
      <body>


        <div class="cronometro-dentro">


          <div class="cabecalho"><LabelRelogio name={this.state.name} /></div>
          <div class="mostrador"><Contador minutos={this.state.minutos} segundos={this.state.segundos} /></div>
          <div class="botao"><Botao onClick={() => this.zerarCronometro()} label={"Zerar"} /></div>
          <div class="botao"><Botao onClick={() => this.pararTempo()} label={this.state.nameStop} /></div>
          <div class="botao"><Botao onClick={() => this.parcial()} label={"Pacial"} /></div>
          <div class="parcial">
            <table>
              <tr>
                <th>Indíce</th>
                <th>Tempo</th>
              </tr>
              <LabelRelogio name={this.state.parcial} />
            </table>
          </div>
        </div>

      </body>
    );
  }
}

export default Cronometro;