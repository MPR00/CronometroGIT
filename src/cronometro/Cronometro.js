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

  StartCronometro() {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }

    const interval = setInterval(() => {
      this.setState({ tempo: this.state.tempo + 1 });
    }, 1000);

    this.setState({ interval });
  }

  StopCronometro() {
    clearInterval(this.state.interval)
    this.setState({ interval: null })
  }

  ZeroCronometro() {
    this.StopCronometro()
    this.setState({ tempo: 0, series: [] })
  }

  AcrescentarSerie() {
    const series = this.state.series.concat([this.state.tempo])

    this.setState({ series })
  }

  getLabelTempo(segundos) {
    return moment()
      .startOf('day')
      .seconds(segundos)
      .format('HH:mm:ss')
  }

  getIntervalo (parcial, volta) {
    const parcialAnterior = this.state.series[volta - 1]

    if (!parcialAnterior) return '-'

    const intervalo = moment(parcial)
      .diff(parcialAnterior)

    return this.getLabelTempo(intervalo)
  }
  
  render() {
    return (
      <div className="Cronometro">
        <div className="interno">
          <div className="chronotime">
            <div className="chronotime-text">
              <span>{this.getLabelTempo(this.state.tempo)}</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              disabled={this.state.interval}
              onClick={event => this.StartCronometro(event)}>
              {this.state.tempo === 0 ? 'Iniciar' : 'Continuar'}
            </button>
            <button
              type="button"
              onClick={event => this.StopCronometro(event)}>
              Parar
          </button>
            <button
              type="button"
              onClick={event => this.ZeroCronometro(event)}>
              Zerar
          </button>
            <button
              type="button"
              onClick={event => this.AcrescentarSerie(event)}>
              Parcial
          </button>
          </div>
        </div>


        <div className="interno interno-table">
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
                <td>{this.getIntervalo(serie, volta)}</td>
              </tr>
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default Cronometro;
