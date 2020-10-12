import React from 'react'
import moment from 'moment'
import './Cronometro.css'

class Cronometro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interval: null,
      tempo: 0,
      series: []
    }
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

  pararCronometro() {
    clearInterval(this.state.interval)
    this.setState({ interval: null })
  }

  zerarCronometro() {
    this.pararCronometro()
    this.setState({ tempo: 0 })
    this.setState({ serie: "" })
  }

  adicionarSerie() {
    const series = this.state.series.concat([this.state.tempo])

    this.setState({ series })
  }

  getLabelTempo(segundos) {
    return moment()
      .startOf('day')
      .seconds(segundos)
      .format('HH:mm:ss')
  }

  render() {
    return (
      <div className="Cronometro">
        <div className="row">
          <div className="chronotime">
            <div className="chronotime-text">
              <span>{this.getLabelTempo(this.state.tempo)}</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              disabled={this.state.interval}
              onClick={event => this.iniciarCronometro(event)}>
              {this.state.tempo === 0 ? 'Iniciar' : 'Continuar'}
            </button>
            <button
              type="button"
              onClick={event => this.pararCronometro(event)}>
              Parar
          </button>
            <button
              type="button"
              onClick={event => this.zerarCronometro(event)}>
              Zerar
          </button>
            <button
              type="button"
              onClick={event => this.adicionarSerie(event)}>
              Parcial
          </button>
          </div>
        </div>


        <div className="row row-table">
          <table>
            <tr>
              <th>Volta</th>
              <th>Tempo</th>
              <th>Intervalo</th>
            </tr>

            {this.state.series.map((serie, volta) => {
              return <tr>
                <td>{volta + 1}</td>
                <td>{this.getLabelTempo(serie)}</td>
                <td></td>
              </tr>
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default Cronometro;
