import React from 'react'
import moment from 'moment-timezone'
import './Relogio.css'

class Relogio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timezone: 'America/Recife',
      zones: moment.tz.zonesForCountry('BR'),
      tempo: moment()
    }

    setInterval(() => {
      this.setState({ tempo: moment() });
    }, 1000);

  }

  getLabelTempo() {
    return moment.tz(this.state.tempo, this.state.timezone).format('HH:mm:ss')
  }

  getLabelDia() {
    return moment(this.state.tempo).format('DD/MM/YYYY')
  }

  setarTimeZone(timezone) {
    this.setState({ timezone })
  }

  render() {
    return (

      <div className="relogio">

        <div className="relogio-text">
          <span className="relogio-data">{this.getLabelDia()}</span>
          <span className="relogio-horario">{this.getLabelTempo()}</span>
          <span className="relogio-fuso">{this.state.timezone}</span>


          <div className="display display-buttons">
            {this.state.zones.map(zone => {
              return <button
                type="button"
                key={zone}
                onClick={event => this.setarTimeZone(zone)}>
                {zone}
              </button>
            })}
          </div>

        </div>
      </div>
    );
  }
}

export default Relogio;