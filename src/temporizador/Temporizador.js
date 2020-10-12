import React from 'react';
import './Temporizador.css';


class Temporizador extends React.Component {

    constructor() {
        super();
        this.state = {
            interval: null,
            horas: '',
            minutos: '',
            segundos: ''
        }
        this.handleChangeHoras = this.handleChangeHoras.bind(this)
        this.handleChangesegundos = this.handleChangesegundos.bind(this)
        this.handleChangeminutos = this.handleChangeminutos.bind(this)
    }
    handleChangesegundos(e) {
        this.setState({ segundos: e.target.value });
    }
    handleChangeminutos(e) {
        this.setState({ minutos: e.target.value });
    }
    handleChangeHoras(e) {
        this.setState({ horas: e.target.value });
    }


    pararTemporizador() {
        clearInterval(this.myInterval)
    }
    iniciarTemporizador() {

        this.myInterval = setInterval(() => {
            clearInterval(this.interval)
            this.setState({ interval: null })
            const { segundos, minutos, horas } = this.state

            if (segundos > 0) {
                this.setState(({ segundos }) => ({
                    segundos: segundos - 1
                }))
            }
            if (segundos === 0) {
                if (minutos > 0) {

                    this.setState(({ minutos }) => ({
                        minutos: minutos - 1,
                        segundos: 59
                    }))
                }
            }
            if (segundos === 0) {
                if (minutos === 0) {
                    if (horas === 0) {
                        clearInterval(this.myInterval)
                    } else {
                        this.setState(({ horas }) => ({
                            horas: horas - 1,
                            minutos: 59,
                            segundos: 59,
                        }))
                    }
                }
            }
        }, 1000)
    }

    zerarTemporizador() {
        this.pararTemporizador()
        this.setState({ horas: '' })
        this.setState({ minutos: '' })
        this.setState({ segundos: '' })
    }


    render() {
        const { horas, minutos, segundos } = this.state
        return (
            <div className='Temporizador'>
                <div className='fundo'>

                    <div className='mostrador'>
                        {horas === 0 && minutos === 0 && segundos === 0
                            ? <h1>Tempo esgotado!</h1>
                            : <h1>Tempo restante:     {horas < 10 ? `0${horas}` : horas}:{minutos < 10 ? `0${minutos}` : minutos}:{segundos < 10 ? `0${segundos}` : segundos}</h1>
                        }
                    </div>

                    <div className='botao'>
                        <button
                            type="button"
                            disabled={this.state.interval}
                            onClick={event => this.iniciarTemporizador(event)}>
                            {this.state.tempo === 0 ? 'INICIAR' : 'Iniciar'}
                        </button>
                        <button
                            type="button"
                            onClick={event => this.pararTemporizador(event)}>
                            Parar
                    </button>
                        <button
                            type="button"
                            onClick={event => this.zerarTemporizador(event)}>
                            Zerar
                     </button>
                    </div>

                    <div  className='tempo'>
                        <div className='horas'>
                            <input type="number" horas={this.state.value} onChange={this.handleChangeHoras} placeholder="Digite as horas..." />
                            <div>{this.state.value}</div>
                        </div>

                        <div className='minutos'>
                            <input type="number" minutos={this.state.value} onChange={this.handleChangeminutos} placeholder="Digite os minutos..." />
                            <div>{this.state.value}</div>
                        </div>

                        <div className= 'segundos'>
                            <input type="number" segundos={this.state.value} onChange={this.handleChangesegundos} placeholder="Digite os segundos..." />
                            <div>{this.state.value}</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default Temporizador;